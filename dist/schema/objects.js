'use strict';

var graphql = require('graphql');
var Book = require('../models/book');
var Author = require('../models/Author');
var User = require('../models/User');
var Rating = require('../models/rating');

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLID = graphql.GraphQLID,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull,
    GraphQLFloat = graphql.GraphQLFloat;


var AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: function fields() {
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
            book: {
                type: new GraphQLList(BookType),
                resolve: function resolve(parent, args) {
                    return Book.find({ authorID: parent.id });
                }
            }
        };
    }
});

var BookType = new GraphQLObjectType({
    name: 'Book',
    fields: function fields() {
        return {
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
                resolve: function resolve(parent, args) {
                    return Author.findById(parent.authorID);
                }
            },
            ratings: {
                type: new GraphQLList(RatingType),
                resolve: function resolve(parent, args) {
                    return Rating.find({ bookId: parent.id });
                }
            },
            AverageRating: {
                type: new GraphQLList(AverageRatingType),
                resolve: function resolve(parent, args) {
                    return Rating.aggregate([{ $match: { bookId: parent.id } }, {
                        $group: {
                            _id: { type: GraphQLString },
                            total: { $sum: "$rating" },
                            count: { $sum: 1 },
                            average: { $avg: "$rating" }
                        }
                    }, {
                        $sort: { average: -1 }
                    }]);
                }
            }

        };
    }
});

var UserType = new GraphQLObjectType({
    name: 'User',
    fields: function fields() {
        return {
            id: { type: GraphQLID },
            uid: { type: GraphQLString },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            image: { type: GraphQLString }
        };
    }
});

var RatingType = new GraphQLObjectType({
    name: 'Rating',
    fields: function fields() {
        return {
            id: { type: GraphQLID },
            rating: { type: GraphQLInt },
            review: { type: GraphQLString },
            bookId: { type: GraphQLString },
            userId: { type: GraphQLString },
            date: { type: GraphQLString },
            book: {
                type: BookType,
                resolve: function resolve(parent, args) {
                    return Book.findById(parent.bookId);
                }
            }
        };
    }
});

var RatingsOrderedType = new GraphQLObjectType({
    name: 'RatingsOrdered',
    fields: {
        _id: { type: GraphQLString },
        total: { type: GraphQLInt },
        count: { type: GraphQLInt },
        average: { type: GraphQLFloat }
    }
});

var AverageRatingType = new GraphQLObjectType({
    name: 'AverageRating',
    fields: {
        _id: { type: GraphQLString },
        total: { type: GraphQLInt },
        count: { type: GraphQLInt },
        average: { type: GraphQLFloat }
    }
});

var CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: {
        _id: { type: GraphQLString },
        userId: { type: GraphQLString },
        bookId: { type: GraphQLString }
    }
});

module.exports = {
    BookType: BookType,
    AuthorType: AuthorType,
    UserType: UserType,
    RatingType: RatingType,
    RatingsOrderedType: RatingsOrderedType,
    CartType: CartType
};