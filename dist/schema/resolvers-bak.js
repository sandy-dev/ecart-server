'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvers = undefined;

var _graphqlSubscriptions = require('graphql-subscriptions');

var _cart = require('../models/cart');

var _book = require('../models/book');

var _author = require('../models/author');

var _rating = require('../models/rating');

var _user = require('../models/user');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CARTADDED = 'CARTADDED';
var pubsub = new _graphqlSubscriptions.PubSub();

var resolvers = exports.resolvers = {
    Query: {

        book: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, args) {
                var book;
                return regeneratorRuntime.wrap(function _callee$(_context) {
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
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(root, args) {
                var _sort, _count, _books, _books2, _count2, _booksSorted;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _sort = args.sort;

                                if (!(args.category == 0)) {
                                    _context3.next = 11;
                                    break;
                                }

                                _context3.next = 4;
                                return _book.BookModel.countDocuments();

                            case 4:
                                _count = _context3.sent;
                                _context3.next = 7;
                                return _book.BookModel.find().sort({ _sort: -1 }).limit(args.limit).skip(args.offset);

                            case 7:
                                _books = _context3.sent;
                                return _context3.abrupt('return', {
                                    count: _count,
                                    Books: _books
                                });

                            case 11:
                                _context3.next = 13;
                                return _book.BookModel.find({
                                    category: args.category
                                });

                            case 13:
                                _books2 = _context3.sent;
                                _count2 = _books2.length;
                                _booksSorted = [];
                                _context3.next = 18;
                                return _book.BookModel.find({
                                    category: args.category
                                }).sort({ _sort: -1 }).limit(args.limit).skip(args.offset).then(function (result) {

                                    var sortedResult = result.sort(function () {
                                        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(x, y) {
                                            var ratingX, ratingY;
                                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                while (1) {
                                                    switch (_context2.prev = _context2.next) {
                                                        case 0:
                                                            if (!(args.sort == 'publishYear')) {
                                                                _context2.next = 4;
                                                                break;
                                                            }

                                                            return _context2.abrupt('return', new Date(y.publishYear) - new Date(x.publishYear));

                                                        case 4:
                                                            _context2.next = 6;
                                                            return _rating.RatingModel.aggregate([{ $match: { bookId: x._id.toString() } }, { $group: { _id: "$bookId", average: { $avg: "$rating" } } }]);

                                                        case 6:
                                                            ratingX = _context2.sent;
                                                            _context2.next = 9;
                                                            return _rating.RatingModel.aggregate([{ $match: { bookId: y._id.toString() } }, { $group: { _id: "$bookId", average: { $avg: "$rating" } } }]);

                                                        case 9:
                                                            ratingY = _context2.sent;


                                                            console.log(ratingX.length);

                                                            if (!(ratingX.length == 0)) {
                                                                _context2.next = 15;
                                                                break;
                                                            }

                                                            return _context2.abrupt('return', 1);

                                                        case 15:
                                                            if (!(ratingY.length == 0)) {
                                                                _context2.next = 19;
                                                                break;
                                                            }

                                                            return _context2.abrupt('return', -1);

                                                        case 19:
                                                            return _context2.abrupt('return', parseFloat(ratingY[0].average) - parseFloat(ratingX[0].average));

                                                        case 20:
                                                        case 'end':
                                                            return _context2.stop();
                                                    }
                                                }
                                            }, _callee2, undefined);
                                        }));

                                        return function (_x5, _x6) {
                                            return _ref3.apply(this, arguments);
                                        };
                                    }());

                                    console.log(sortedResult);

                                    _booksSorted = result;
                                });

                            case 18:
                                return _context3.abrupt('return', {
                                    count: _count2,
                                    Books: _booksSorted
                                });

                            case 19:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, undefined);
            }));

            return function books(_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        }(),

        author: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root, args) {
                var author;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _author.AuthorModel.findById(args.id);

                            case 2:
                                author = _context4.sent;
                                return _context4.abrupt('return', author);

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, undefined);
            }));

            return function author(_x7, _x8) {
                return _ref4.apply(this, arguments);
            };
        }(),
        authors: function authors() {
            var _this = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return _author.AuthorModel.find();

                            case 2:
                                return _context5.abrupt('return', _context5.sent);

                            case 3:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this);
            }))();
        },


        rating: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(root, args) {
                var rating;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return _rating.RatingModel.findById(args.id);

                            case 2:
                                rating = _context6.sent;
                                return _context6.abrupt('return', rating);

                            case 4:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, undefined);
            }));

            return function rating(_x9, _x10) {
                return _ref5.apply(this, arguments);
            };
        }(),
        ratings: function ratings() {
            var _this2 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return _rating.RatingModel.find();

                            case 2:
                                return _context7.abrupt('return', _context7.sent);

                            case 3:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, _this2);
            }))();
        },

        ratingsOrdered: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(root, args) {
                var rating;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
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
                                rating = _context8.sent;
                                return _context8.abrupt('return', rating);

                            case 4:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, undefined);
            }));

            return function ratingsOrdered(_x11, _x12) {
                return _ref6.apply(this, arguments);
            };
        }(),

        user: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(root, args) {
                var user;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return _user.UserModel.findOne({ uid: args.uid });

                            case 2:
                                user = _context9.sent;
                                return _context9.abrupt('return', user);

                            case 4:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, undefined);
            }));

            return function user(_x13, _x14) {
                return _ref7.apply(this, arguments);
            };
        }(),
        users: function users() {
            var _this3 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return _user.UserModel.find();

                            case 2:
                                return _context10.abrupt('return', _context10.sent);

                            case 3:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, _this3);
            }))();
        },


        cart: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(root, args) {
                var cart;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return _cart.CartModel.findOne({ userId: args.userId });

                            case 2:
                                cart = _context11.sent;
                                return _context11.abrupt('return', cart);

                            case 4:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, undefined);
            }));

            return function cart(_x15, _x16) {
                return _ref8.apply(this, arguments);
            };
        }(),
        carts: function carts() {
            var _this4 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return _cart.CartModel.find();

                            case 2:
                                return _context12.abrupt('return', _context12.sent);

                            case 3:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, _this4);
            }))();
        }
    },

    Book: {
        author: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(args) {
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _context13.next = 2;
                                return _author.AuthorModel.findById(args.authorID);

                            case 2:
                                return _context13.abrupt('return', _context13.sent);

                            case 3:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, undefined);
            }));

            return function author(_x17) {
                return _ref9.apply(this, arguments);
            };
        }(),
        ratings: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(args) {
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _context14.next = 2;
                                return _rating.RatingModel.find({ bookId: args._id });

                            case 2:
                                return _context14.abrupt('return', _context14.sent);

                            case 3:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee14, undefined);
            }));

            return function ratings(_x18) {
                return _ref10.apply(this, arguments);
            };
        }(),
        AverageRating: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(args) {
                var rating;
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _context15.next = 2;
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
                                rating = _context15.sent;
                                return _context15.abrupt('return', rating);

                            case 4:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, _callee15, undefined);
            }));

            return function AverageRating(_x19) {
                return _ref11.apply(this, arguments);
            };
        }()
    },

    Mutation: {
        addBook: function addBook(root, args) {
            var _this5 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
                var book;
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
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
                }, _callee16, _this5);
            }))();
        },
        updateBook: function updateBook(root, args) {
            var _this6 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
                var book;
                return regeneratorRuntime.wrap(function _callee17$(_context17) {
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
                                console.log(book);
                                return _context17.abrupt('return', book);

                            case 16:
                            case 'end':
                                return _context17.stop();
                        }
                    }
                }, _callee17, _this6);
            }))();
        },
        addCart: function addCart(root, args) {
            var _this7 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
                var cart, cart_count, _count;

                return regeneratorRuntime.wrap(function _callee18$(_context18) {
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

                                //return cart

                            case 9:
                            case 'end':
                                return _context18.stop();
                        }
                    }
                }, _callee18, _this7);
            }))();
        },
        addRating: function addRating(root, args) {
            var _this8 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
                var rating;
                return regeneratorRuntime.wrap(function _callee19$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                _context19.next = 2;
                                return _rating.RatingModel.create(args);

                            case 2:
                                rating = _context19.sent;
                                return _context19.abrupt('return', rating);

                            case 4:
                            case 'end':
                                return _context19.stop();
                        }
                    }
                }, _callee19, _this8);
            }))();
        },
        addUser: function addUser(root, args) {
            var _this9 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
                var user;
                return regeneratorRuntime.wrap(function _callee20$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                                _context20.next = 2;
                                return _user.UserModel.create(args);

                            case 2:
                                user = _context20.sent;
                                return _context20.abrupt('return', user);

                            case 4:
                            case 'end':
                                return _context20.stop();
                        }
                    }
                }, _callee20, _this9);
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