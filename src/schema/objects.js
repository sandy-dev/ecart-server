const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/Author')
const User = require('../models/User')
const Rating = require('../models/rating')

const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema,
    GraphQLList, GraphQLNonNull, GraphQLFloat
} = graphql


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorID: parent.id })
            }
        }
    })
})


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        pages: { type: GraphQLInt },
        image: { type: GraphQLString },

        price: { type: GraphQLString },
        description: { type: GraphQLString },
        language: { type: GraphQLString },
        publishYear: { type: GraphQLString },
        category: { type: GraphQLString },

        authorID: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorID)
            }
        },
        ratings: {
            type: new GraphQLList(RatingType),
            resolve(parent, args) {
                return Rating.find({ bookId: parent.id })
            }
        },
        AverageRating: {
            type: new GraphQLList(AverageRatingType),
            resolve(parent, args) {
                return Rating.aggregate(
                    [
                        { $match: { bookId: parent.id } },
                        {
                            $group: {
                                _id: { type: GraphQLString },
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
            }
        }

    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        uid: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        image: { type: GraphQLString },
    })
})

const RatingType = new GraphQLObjectType({
    name: 'Rating',
    fields: () => ({
        id: { type: GraphQLID },
        rating: { type: GraphQLInt },
        review: { type: GraphQLString },
        bookId: { type: GraphQLString },
        userId: { type: GraphQLString },
        date: { type: GraphQLString },
        book: {
            type: BookType,
            resolve(parent, args) {
                return Book.findById(parent.bookId)
            }
        }
    })
})


const RatingsOrderedType = new GraphQLObjectType({
    name: 'RatingsOrdered',
    fields: {
        _id: { type: GraphQLString },
        total: { type: GraphQLInt },
        count: { type: GraphQLInt },
        average: { type: GraphQLFloat },
    }
})

const AverageRatingType = new GraphQLObjectType({
    name: 'AverageRating',
    fields: {
        _id: { type: GraphQLString },
        total: { type: GraphQLInt },
        count: { type: GraphQLInt },
        average: { type: GraphQLFloat },
    }
})

const CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: {
        _id: { type: GraphQLString },
        userId: { type: GraphQLString },
        bookId: { type: GraphQLString },
    }
})

module.exports = ({
    BookType,
    AuthorType,
    UserType,
    RatingType,
    RatingsOrderedType,
    CartType
})