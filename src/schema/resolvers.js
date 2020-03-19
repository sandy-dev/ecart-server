import { PubSub } from 'graphql-subscriptions'
import { CartModel } from '../models/cart'
import { BookModel } from '../models/book'
import { AuthorModel } from '../models/author'
import { RatingModel } from '../models/rating'
import { UserModel } from '../models/user'
const CARTADDED = 'CARTADDED'
const RATINGADDED = 'RATINGADDED'
const pubsub = new PubSub()

export const resolvers = {
    Query: {

        book: async (root, args) => {
            let book = await BookModel.findById(args.id)
            return book
        },

        books: async (root, args) => {

            const _sort = args.sort
            let _count = []
            let _booksSorted = []

            const seeacrText = new RegExp(args.search.toString(), 'i')
            const authorText = new RegExp(args.author.toString(), 'i')

            if (args.category > 0) {
                _count = await BookModel.aggregate([{ $match: { category: args.category.toString(), name: seeacrText, authorID: authorText } }, { $count: "totalCount" }])
            } else {
                _count = await BookModel.aggregate([{ $match: { name: seeacrText, authorID: authorText } }, { $count: "totalCount" }])
            }

            if (args.sort == 'rating') {

                if (args.category > 0) {
                    _booksSorted = await BookModel.find({ category: args.category, name: seeacrText, authorID: authorText }).sort({ 'averageRating': -1 }).limit(args.limit).skip(args.offset)
                } else {
                    _booksSorted = await BookModel.find({ name: seeacrText, authorID: authorText }).sort({ 'averageRating': -1 }).limit(args.limit).skip(args.offset)
                }

            } else {
                if (args.category > 0) {
                    await BookModel.find({ category: args.category, name: seeacrText, authorID: authorText })
                        //.limit(args.limit).skip(args.offset)
                        .then((result) => {
                            result.sort((x, y) => {
                                return new Date(y.publishYear).getTime() - new Date(x.publishYear).getTime()
                            })
                            _booksSorted = result.slice(args.offset, args.limit + args.offset)

                        })

                } else {
                    await BookModel.find({ name: seeacrText, authorID: authorText })
                        .then((result) => {
                            _booksSorted = result.sort((x, y) => {
                                return new Date(y.publishYear).getTime() - new Date(x.publishYear).getTime()
                            }).slice(args.offset, args.limit + args.offset)
                        })
                }
            }

            return {
                count: _count.length > 0 ? _count[0]['totalCount'] : 0,
                Books: _booksSorted
            }

        },

        author: async (root, args, context) => {

            auth(context.request, context.response)

            let author = await AuthorModel.findById(args.id)
            return author
        },
        async authors() {
            return await AuthorModel.find()
        },

        rating: async (root, args) => {
            let rating = await RatingModel.findById(args.id)
            return rating
        },
        async ratings() {
            return await RatingModel.find()
        },
        ratingsOrdered: async (root, args) => {
            let rating = await RatingModel.aggregate(
                [
                    { $match: {} },
                    {
                        $group: {
                            _id: "$bookId",
                            total: { $sum: "$rating" },
                            count: { $sum: 1 },
                            average: { $avg: "$rating" }
                        }
                    },
                    {
                        $sort: { average: -1 }
                    }
                ]
            )

            return rating
        },


        user: async (root, args) => {
            let user = await UserModel.findOne({ uid: args.uid })
            return user
        },
        async users() {
            return await UserModel.find()
        },


        cart: async (root, args) => {
            let cart = await CartModel.findOne({ userId: args.userId })
            return cart
        },
        carts: async (root, args) => {
            let lstCount = await CartModel.aggregate([{ $match: { userId: args.userId } }, { $count: "totalCount" }])
            console.log(lstCount)
            let _count = lstCount.length > 0 ? lstCount[0]['totalCount'] : 0
            let _carts = await CartModel.find({ userId: args.userId }).populate('book').limit(args.limit == 0 ? _count : args.limit).skip(args.offset)
            return {
                count: _count,
                Carts: _carts
            }

            // let carts = await CartModel.aggregate([
            //     {
            //         $lookup:
            //         {
            //             from: 'books',
            //             localField: 'bookId',
            //             foreignField: '_id',
            //             as: 'books'
            //         }
            //     }
            // ]) .then((result) => {
            //     console.log(result)
            // })
        }
    },

    Book: {
        author: async (args) => {
            return await AuthorModel.findById(args.authorID)
        },
        ratings: async (args) => {
            return await RatingModel.find({ bookId: args._id })
        },
        AverageRating: async (args) => {
            let rating = await RatingModel.aggregate(
                [
                    { $match: { bookId: args._id.toString() } },
                    {
                        $group: {
                            _id: "$bookId",
                            total: { $sum: "$rating" },
                            count: { $sum: 1 },
                            average: { $avg: "$rating" }
                        }
                    },
                    {
                        $sort: { average: -1 }
                    }
                ]
            )

            return rating

        }
    },

    Cart: {
        book: async (args) => {
            return await BookModel.findById(args.bookId)
        }
    },

    Mutation: {

        async addBook(root, args) {
            const book = await BookModel.create(args)
            return book
        },
        async updateBook(root, args) {

            let book = await BookModel.findById(args.id)
            book.name = args.name
            book.pages = args.pages
            book.image = args.image
            book.authorID = args.authorID
            book.price = args.price
            book.description = args.description
            book.language = args.language
            book.publishYear = args.publishYear
            book.category = args.category
            await book.save()
            return book
        },

        async addCart(root, args) {
            const cart = await CartModel.create(args)

            let cart_count = await CartModel.aggregate(
                [
                    { $match: { userId: args.userId.toString() } },
                    {
                        $group: {
                            _id: "$userId",
                            count: { $sum: 1 },
                        }
                    }
                ])

            let _count = 0
            cart_count.length > 0 ? _count = cart_count[0].count : null

            pubsub.publish(CARTADDED, {
                cartAdded: {
                    count: _count
                }
            })

            return cart
        },

        removeCart: async (root, args) => {
            const deletedItem = await CartModel.findByIdAndDelete(args.id)

            let cart_count = await CartModel.aggregate(
                [
                    { $match: { userId: args.userId.toString() } },
                    {
                        $group: {
                            _id: "$userId",
                            count: { $sum: 1 },
                        }
                    }
                ])

            let _count = 0
            _count = cart_count.length > 0 ? cart_count[0].count : 0

            pubsub.publish(CARTADDED, {
                cartAdded: {
                    count: _count
                }
            })

            return {
                count: _count,
                id: deletedItem.id
            }
        },


        async addRating(root, args) {

            //update book collection with rating data
            let book = await BookModel.findById(args.bookId)
            let ratings = await RatingModel.find({ bookId: args.bookId })

            let total = 0, count = 0
            if (ratings && ratings.length > 0) {
                ratings.map(a => { total = total + a.rating, count++ })
            }

            count++

            book.averageRating = ((total + args.rating) / count).toFixed(1)
            book.ratingCount = count

            const rating = await RatingModel.create(args)

            await book.save()

            pubsub.publish(RATINGADDED, {
                ratingAdded: {
                    count: count
                }
            })

            return rating

        },

        async addUser(root, args) {
            const user = await UserModel.create(args)
            return user
        },

        async addAuthor(root, args) {
            const author = await AuthorModel.create(args)
            return author
        },

        async removeAuthor(root, args) {
            const author = await AuthorModel.findByIdAndDelete(args.id)
            return author
        },
    },

    Subscription: {
        cartAdded: {
            subscribe: () => pubsub.asyncIterator(CARTADDED)
        },
        ratingAdded: {
            subscribe: () => pubsub.asyncIterator(RATINGADDED)
        }
    },
}

const auth = (req, res, next) => {

    const token = req.header('x-auth-token')

    if (!token)
        return res.status(401).json({ msg: 'No token, authorizaton denied' })

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' })
    }
}