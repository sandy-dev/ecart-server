import { PubSub } from 'graphql-subscriptions'
import { CartModel } from '../models/cart'
import { BookModel } from '../models/book'
import { AuthorModel } from '../models/author'
import { RatingModel } from '../models/rating'
import { UserModel } from '../models/user'

const CARTADDED = 'CARTADDED'
const pubsub = new PubSub()

export const resolvers = {
    Query: {

        book: async (root, args) => {
            let book = await BookModel.findById(args.id)
            return book
        },

        books: async (root, args) => {

            let _sort = args.sort
            if (args.category == 0) {

                const _count = await BookModel.countDocuments()

                const _books = await BookModel.find()
                    .sort({ _sort: -1 })
                    .limit(args.limit)
                    .skip(args.offset)

                return {
                    count: _count,
                    Books: _books
                }


            } else {

                const _books = await BookModel.find({
                    category: args.category
                })
                const _count = _books.length

                let _booksSorted = []

                await BookModel.find({
                    category: args.category
                })
                    .sort({ _sort: -1 })
                    .limit(args.limit)
                    .skip(args.offset)
                    .then((result) => {

                        let sortedResult = result.sort(async (x, y) => {

                            if (args.sort == 'publishYear') {

                                return new Date(y.publishYear) - new Date(x.publishYear)

                            } else {

                                let ratingX = await RatingModel.aggregate([{ $match: { bookId: x._id.toString() } }, { $group: { _id: "$bookId", average: { $avg: "$rating" } } }])
                                let ratingY = await RatingModel.aggregate([{ $match: { bookId: y._id.toString() } }, { $group: { _id: "$bookId", average: { $avg: "$rating" } } }])

                                console.log(ratingX.length)

                                if (ratingX.length == 0)
                                    return 1
                                else if (ratingY.length == 0)
                                    return -1
                                else {
                                    return parseFloat(ratingY[0].average) - parseFloat(ratingX[0].average)
                                }
                            }
                        })

                        console.log(sortedResult)

                        _booksSorted = result
                    })

                return {
                    count: _count,
                    Books: _booksSorted
                }
            }
        },


        author: async (root, args) => {
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
        async carts() {
            return await CartModel.find()
        },
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
            console.log(book)
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

            //return cart
        },


        async addRating(root, args) {
            const rating = await RatingModel.create(args)
            return rating
        },

        async addUser(root, args) {
            const user = await UserModel.create(args)
            return user
        },
    },

    Subscription: {
        cartAdded: {
            subscribe: () => pubsub.asyncIterator(CARTADDED)
        }
    },
}