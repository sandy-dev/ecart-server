'use strict';

var graphql = require('graphql');
var Book = require('../models/book');
var Author = require('../models/Author');
var User = require('../models/User');
var Rating = require('../models/rating');
var Cart = require('../models/cart');

var _require = require('./objects'),
    BookType = _require.BookType,
    AuthorType = _require.AuthorType,
    UserType = _require.UserType,
    RatingType = _require.RatingType,
    RatingsOrderedType = _require.RatingsOrderedType,
    CartType = _require.CartType;

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLID = graphql.GraphQLID,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLFloat = graphql.GraphQLFloat,
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;


var RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parent, args) {
                return Book.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: function resolve(parent, args) {
                return Book.find({});
            }
        },

        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve: function resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: function resolve(parent, args) {
                return Author.find({});
            }
        },

        user: {
            type: UserType,
            args: { uid: { type: GraphQLString } },
            resolve: function resolve(parent, args) {
                return User.findOne(args);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: function resolve(parent, args) {
                return User.find({});
            }
        },

        rating: {
            type: RatingType,
            args: { id: { type: GraphQLString } },
            resolve: function resolve(parent, args) {
                return Rating.findById(args.id);
            }
        },
        ratings: {
            type: new GraphQLList(RatingType),
            resolve: function resolve(parent, args) {
                return Rating.find({});
            }
        },

        ratingsOrdered: {
            type: new GraphQLList(RatingsOrderedType),
            resolve: function resolve(parent, args) {
                return Rating.aggregate([{ $match: {} }, {
                    $group: {
                        _id: "$bookId",
                        total: { $sum: "$rating" },
                        count: { $sum: 1 },
                        average: { $avg: "$rating" }
                    }
                }, {
                    $sort: { average: -1 }
                }]);
            }
        },

        cart: {
            type: new GraphQLList(CartType),
            args: { userId: { type: GraphQLString } },
            resolve: function resolve(parent, args) {
                return Cart.find({ userId: args.userId });
            }
        },
        carts: {
            type: new GraphQLList(CartType),
            resolve: function resolve(parent, args) {
                return Cart.find({});
            }
        }

    }
});

var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                pages: { type: new GraphQLNonNull(GraphQLInt) },
                image: { type: new GraphQLNonNull(GraphQLString) },
                authorID: { type: new GraphQLNonNull(GraphQLString) },

                price: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                language: { type: new GraphQLNonNull(GraphQLString) },
                publishYear: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) }

            },
            resolve: function resolve(parent, args) {
                var book = new Book({
                    name: args.name,
                    pages: args.pages,
                    image: args.image,
                    authorID: args.authorID,

                    price: args.price,
                    description: args.description,
                    language: args.language,
                    publishYear: args.publishYear,
                    category: args.category

                });
                return book.save();
            }
        },

        updateBook: {
            type: BookType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                pages: { type: new GraphQLNonNull(GraphQLInt) },
                image: { type: new GraphQLNonNull(GraphQLString) },
                authorID: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                language: { type: new GraphQLNonNull(GraphQLString) },
                publishYear: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) }

            },
            resolve: function resolve(parent, args) {
                Book.findById(args.id, function (err, doc) {
                    if (err) console.log(err);

                    doc.name = args.name;
                    doc.pages = args.pages;
                    doc.image = args.image;
                    doc.authorID = args.authorID;
                    doc.price = args.price;
                    doc.description = args.description;
                    doc.language = args.language;
                    doc.publishYear = args.publishYear;
                    doc.category = args.category;
                    doc.save();
                });
            }
        },

        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: function resolve(parent, args) {
                var author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },

        addUser: {
            type: UserType,
            args: {
                uid: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                image: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: function resolve(parent, args) {
                var user = new User({
                    uid: args.uid,
                    name: args.name,
                    email: args.email,
                    image: args.image
                });
                return user.save();
            }
        },

        addRating: {
            type: RatingType,
            args: {
                rating: { type: new GraphQLNonNull(GraphQLInt) },
                review: { type: new GraphQLNonNull(GraphQLString) },
                bookId: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) },
                date: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: function resolve(parent, args) {
                var rating = new Rating({
                    rating: args.rating,
                    review: args.review,
                    bookId: args.bookId,
                    userId: args.userId,
                    date: args.date
                });
                return rating.save();
            }
        },

        addCart: {
            type: CartType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLString) },
                bookId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: function resolve(parent, args) {
                var cart = new Cart({
                    userId: args.userId,
                    bookId: args.bookId
                });
                return cart.save();
            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

//mutation

// mutation{
//     addAuthor(name:"parineeti",age:30){
//       name
//       age
//     }
//   }