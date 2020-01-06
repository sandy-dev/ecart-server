'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvers = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphqlSubscriptions = require('graphql-subscriptions');

var _cart = require('../models/cart');

var _book = require('../models/book');

var _author = require('../models/author');

var _rating = require('../models/rating');

var _user = require('../models/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CARTADDED = 'CARTADDED';
var pubsub = new _graphqlSubscriptions.PubSub();

var resolvers = exports.resolvers = {
    Query: {

        book: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(root, args) {
                var book;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _book.BookModel.findById(args.id);

                            case 2:
                                book = _context.sent;
                                return _context.abrupt('return', book);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function book(_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }(),

        books: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(root, args) {
                var _sort, _count, _booksSorted, seeacrText, authorText;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _sort = args.sort;
                                _count = [];
                                _booksSorted = [];
                                seeacrText = new RegExp(args.search.toString(), 'i');
                                authorText = new RegExp(args.author.toString(), 'i');

                                if (!(args.category > 0)) {
                                    _context2.next = 11;
                                    break;
                                }

                                _context2.next = 8;
                                return _book.BookModel.aggregate([{ $match: { category: args.category.toString(), name: seeacrText, authorID: authorText } }, { $count: "totalCount" }]);

                            case 8:
                                _count = _context2.sent;
                                _context2.next = 14;
                                break;

                            case 11:
                                _context2.next = 13;
                                return _book.BookModel.aggregate([{ $match: { name: seeacrText, authorID: authorText } }, { $count: "totalCount" }]);

                            case 13:
                                _count = _context2.sent;

                            case 14:
                                if (!(args.sort == 'rating')) {
                                    _context2.next = 26;
                                    break;
                                }

                                if (!(args.category > 0)) {
                                    _context2.next = 21;
                                    break;
                                }

                                _context2.next = 18;
                                return _book.BookModel.find({ category: args.category, name: seeacrText, authorID: authorText }).sort({ 'averageRating': -1 }).limit(args.limit).skip(args.offset);

                            case 18:
                                _booksSorted = _context2.sent;
                                _context2.next = 24;
                                break;

                            case 21:
                                _context2.next = 23;
                                return _book.BookModel.find({ name: seeacrText, authorID: authorText }).sort({ 'averageRating': -1 }).limit(args.limit).skip(args.offset);

                            case 23:
                                _booksSorted = _context2.sent;

                            case 24:
                                _context2.next = 33;
                                break;

                            case 26:
                                if (!(args.category > 0)) {
                                    _context2.next = 31;
                                    break;
                                }

                                _context2.next = 29;
                                return _book.BookModel.find({ category: args.category, name: seeacrText, authorID: authorText })
                                //.limit(args.limit).skip(args.offset)
                                .then(function (result) {
                                    result.sort(function (x, y) {
                                        return new Date(y.publishYear).getTime() - new Date(x.publishYear).getTime();
                                    });
                                    _booksSorted = result.slice(args.offset, args.limit + args.offset);
                                });

                            case 29:
                                _context2.next = 33;
                                break;

                            case 31:
                                _context2.next = 33;
                                return _book.BookModel.find({ name: seeacrText, authorID: authorText }).then(function (result) {
                                    _booksSorted = result.sort(function (x, y) {
                                        return new Date(y.publishYear).getTime() - new Date(x.publishYear).getTime();
                                    }).slice(args.offset, args.limit + args.offset);
                                });

                            case 33:
                                return _context2.abrupt('return', {
                                    count: _count.length > 0 ? _count[0]['totalCount'] : 0,
                                    Books: _booksSorted
                                });

                            case 34:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined);
            }));

            return function books(_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        }(),

        author: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(root, args) {
                var author;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return _author.AuthorModel.findById(args.id);

                            case 2:
                                author = _context3.sent;
                                return _context3.abrupt('return', author);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, undefined);
            }));

            return function author(_x5, _x6) {
                return _ref3.apply(this, arguments);
            };
        }(),
        authors: function authors() {
            var _this = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _author.AuthorModel.find();

                            case 2:
                                return _context4.abrupt('return', _context4.sent);

                            case 3:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this);
            }))();
        },


        rating: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(root, args) {
                var rating;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return _rating.RatingModel.findById(args.id);

                            case 2:
                                rating = _context5.sent;
                                return _context5.abrupt('return', rating);

                            case 4:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, undefined);
            }));

            return function rating(_x7, _x8) {
                return _ref4.apply(this, arguments);
            };
        }(),
        ratings: function ratings() {
            var _this2 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return _rating.RatingModel.find();

                            case 2:
                                return _context6.abrupt('return', _context6.sent);

                            case 3:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this2);
            }))();
        },

        ratingsOrdered: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(root, args) {
                var rating;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return _rating.RatingModel.aggregate([{ $match: {} }, {
                                    $group: {
                                        _id: "$bookId",
                                        total: { $sum: "$rating" },
                                        count: { $sum: 1 },
                                        average: { $avg: "$rating" }
                                    }
                                }, {
                                    $sort: { average: -1 }
                                }]);

                            case 2:
                                rating = _context7.sent;
                                return _context7.abrupt('return', rating);

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, undefined);
            }));

            return function ratingsOrdered(_x9, _x10) {
                return _ref5.apply(this, arguments);
            };
        }(),

        user: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(root, args) {
                var user;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return _user.UserModel.findOne({ uid: args.uid });

                            case 2:
                                user = _context8.sent;
                                return _context8.abrupt('return', user);

                            case 4:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, undefined);
            }));

            return function user(_x11, _x12) {
                return _ref6.apply(this, arguments);
            };
        }(),
        users: function users() {
            var _this3 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return _user.UserModel.find();

                            case 2:
                                return _context9.abrupt('return', _context9.sent);

                            case 3:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, _this3);
            }))();
        },


        cart: function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(root, args) {
                var cart;
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return _cart.CartModel.findOne({ userId: args.userId });

                            case 2:
                                cart = _context10.sent;
                                return _context10.abrupt('return', cart);

                            case 4:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, undefined);
            }));

            return function cart(_x13, _x14) {
                return _ref7.apply(this, arguments);
            };
        }(),
        carts: function () {
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(root, args) {
                var carts;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return _cart.CartModel.find({ userId: args.userId }).populate('book');

                            case 2:
                                carts = _context11.sent;
                                return _context11.abrupt('return', carts);

                            case 4:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, undefined);
            }));

            return function carts(_x15, _x16) {
                return _ref8.apply(this, arguments);
            };
        }()
    },

    Book: {
        author: function () {
            var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(args) {
                return _regenerator2.default.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return _author.AuthorModel.findById(args.authorID);

                            case 2:
                                return _context12.abrupt('return', _context12.sent);

                            case 3:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, undefined);
            }));

            return function author(_x17) {
                return _ref9.apply(this, arguments);
            };
        }(),
        ratings: function () {
            var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(args) {
                return _regenerator2.default.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _context13.next = 2;
                                return _rating.RatingModel.find({ bookId: args._id });

                            case 2:
                                return _context13.abrupt('return', _context13.sent);

                            case 3:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, undefined);
            }));

            return function ratings(_x18) {
                return _ref10.apply(this, arguments);
            };
        }(),
        AverageRating: function () {
            var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(args) {
                var rating;
                return _regenerator2.default.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _context14.next = 2;
                                return _rating.RatingModel.aggregate([{ $match: { bookId: args._id.toString() } }, {
                                    $group: {
                                        _id: "$bookId",
                                        total: { $sum: "$rating" },
                                        count: { $sum: 1 },
                                        average: { $avg: "$rating" }
                                    }
                                }, {
                                    $sort: { average: -1 }
                                }]);

                            case 2:
                                rating = _context14.sent;
                                return _context14.abrupt('return', rating);

                            case 4:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee14, undefined);
            }));

            return function AverageRating(_x19) {
                return _ref11.apply(this, arguments);
            };
        }()
    },

    Cart: {
        book: function () {
            var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(args) {
                return _regenerator2.default.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _context15.next = 2;
                                return _book.BookModel.findById(args.bookId);

                            case 2:
                                return _context15.abrupt('return', _context15.sent);

                            case 3:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, _callee15, undefined);
            }));

            return function book(_x20) {
                return _ref12.apply(this, arguments);
            };
        }()
    },

    Mutation: {
        addBook: function addBook(root, args) {
            var _this4 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
                var book;
                return _regenerator2.default.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                _context16.next = 2;
                                return _book.BookModel.create(args);

                            case 2:
                                book = _context16.sent;
                                return _context16.abrupt('return', book);

                            case 4:
                            case 'end':
                                return _context16.stop();
                        }
                    }
                }, _callee16, _this4);
            }))();
        },
        updateBook: function updateBook(root, args) {
            var _this5 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
                var book;
                return _regenerator2.default.wrap(function _callee17$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                _context17.next = 2;
                                return _book.BookModel.findById(args.id);

                            case 2:
                                book = _context17.sent;

                                book.name = args.name;
                                book.pages = args.pages;
                                book.image = args.image;
                                book.authorID = args.authorID;
                                book.price = args.price;
                                book.description = args.description;
                                book.language = args.language;
                                book.publishYear = args.publishYear;
                                book.category = args.category;
                                _context17.next = 14;
                                return book.save();

                            case 14:
                                return _context17.abrupt('return', book);

                            case 15:
                            case 'end':
                                return _context17.stop();
                        }
                    }
                }, _callee17, _this5);
            }))();
        },
        addCart: function addCart(root, args) {
            var _this6 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
                var cart, cart_count, _count;

                return _regenerator2.default.wrap(function _callee18$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                _context18.next = 2;
                                return _cart.CartModel.create(args);

                            case 2:
                                cart = _context18.sent;
                                _context18.next = 5;
                                return _cart.CartModel.aggregate([{ $match: { userId: args.userId.toString() } }, {
                                    $group: {
                                        _id: "$userId",
                                        count: { $sum: 1 }
                                    }
                                }]);

                            case 5:
                                cart_count = _context18.sent;
                                _count = 0;

                                cart_count.length > 0 ? _count = cart_count[0].count : null;

                                pubsub.publish(CARTADDED, {
                                    cartAdded: {
                                        count: _count
                                    }
                                });

                                return _context18.abrupt('return', cart);

                            case 10:
                            case 'end':
                                return _context18.stop();
                        }
                    }
                }, _callee18, _this6);
            }))();
        },


        removeCart: function () {
            var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(root, args) {
                var deletedItem, cart_count, _count;

                return _regenerator2.default.wrap(function _callee19$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                _context19.next = 2;
                                return _cart.CartModel.findByIdAndDelete(args.id);

                            case 2:
                                deletedItem = _context19.sent;
                                _context19.next = 5;
                                return _cart.CartModel.aggregate([{ $match: { userId: args.userId.toString() } }, {
                                    $group: {
                                        _id: "$userId",
                                        count: { $sum: 1 }
                                    }
                                }]);

                            case 5:
                                cart_count = _context19.sent;
                                _count = 0;

                                cart_count.length > 0 ? _count = cart_count[0].count : null;

                                pubsub.publish(CARTADDED, {
                                    cartAdded: {
                                        count: _count
                                    }
                                });

                                return _context19.abrupt('return', { count: deletedItem.id });

                            case 10:
                            case 'end':
                                return _context19.stop();
                        }
                    }
                }, _callee19, undefined);
            }));

            return function removeCart(_x21, _x22) {
                return _ref13.apply(this, arguments);
            };
        }(),

        addRating: function addRating(root, args) {
            var _this7 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20() {
                var rating, book, ratings, total, count;
                return _regenerator2.default.wrap(function _callee20$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                                _context20.next = 2;
                                return _rating.RatingModel.create(args);

                            case 2:
                                rating = _context20.sent;
                                _context20.next = 5;
                                return _book.BookModel.findById(args.bookId);

                            case 5:
                                book = _context20.sent;
                                _context20.next = 8;
                                return _rating.RatingModel.find({ bookId: args.bookId });

                            case 8:
                                ratings = _context20.sent;
                                total = 0, count = 0;

                                if (ratings && ratings.length > 0) {
                                    ratings.map(function (a) {
                                        total = total + a.rating, count++;
                                    });
                                }
                                book.averageRating = ((total + args.rating) / count).toFixed(1);
                                book.ratingCount = count;
                                _context20.next = 15;
                                return book.save();

                            case 15:
                                return _context20.abrupt('return', rating);

                            case 16:
                            case 'end':
                                return _context20.stop();
                        }
                    }
                }, _callee20, _this7);
            }))();
        },
        addUser: function addUser(root, args) {
            var _this8 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21() {
                var user;
                return _regenerator2.default.wrap(function _callee21$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                _context21.next = 2;
                                return _user.UserModel.create(args);

                            case 2:
                                user = _context21.sent;
                                return _context21.abrupt('return', user);

                            case 4:
                            case 'end':
                                return _context21.stop();
                        }
                    }
                }, _callee21, _this8);
            }))();
        },
        addAuthor: function addAuthor(root, args) {
            var _this9 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22() {
                var author;
                return _regenerator2.default.wrap(function _callee22$(_context22) {
                    while (1) {
                        switch (_context22.prev = _context22.next) {
                            case 0:
                                _context22.next = 2;
                                return _author.AuthorModel.create(args);

                            case 2:
                                author = _context22.sent;
                                return _context22.abrupt('return', author);

                            case 4:
                            case 'end':
                                return _context22.stop();
                        }
                    }
                }, _callee22, _this9);
            }))();
        },
        removeAuthor: function removeAuthor(root, args) {
            var _this10 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23() {
                var author;
                return _regenerator2.default.wrap(function _callee23$(_context23) {
                    while (1) {
                        switch (_context23.prev = _context23.next) {
                            case 0:
                                _context23.next = 2;
                                return _author.AuthorModel.findByIdAndDelete(args.id);

                            case 2:
                                author = _context23.sent;
                                return _context23.abrupt('return', author);

                            case 4:
                            case 'end':
                                return _context23.stop();
                        }
                    }
                }, _callee23, _this10);
            }))();
        }
    },

    Subscription: {
        cartAdded: {
            subscribe: function subscribe() {
                return pubsub.asyncIterator(CARTADDED);
            }
        }
    }
};