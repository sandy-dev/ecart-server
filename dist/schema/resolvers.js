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

var _gallery = require('../models/gallery');

var _book = require('../models/book');

var _author = require('../models/author');

var _rating = require('../models/rating');

var _user = require('../models/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CARTADDED = 'CARTADDED';
var RATINGADDED = 'RATINGADDED';
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
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(root, args, context) {
                var author;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:

                                auth(context.request, context.response);

                                _context3.next = 3;
                                return _author.AuthorModel.findById(args.id);

                            case 3:
                                author = _context3.sent;
                                return _context3.abrupt('return', author);

                            case 5:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, undefined);
            }));

            return function author(_x5, _x6, _x7) {
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

            return function rating(_x8, _x9) {
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

            return function ratingsOrdered(_x10, _x11) {
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

            return function user(_x12, _x13) {
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

            return function cart(_x14, _x15) {
                return _ref7.apply(this, arguments);
            };
        }(),
        carts: function () {
            var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(root, args) {
                var lstCount, _count, _carts;

                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return _cart.CartModel.aggregate([{ $match: { userId: args.userId } }, { $count: "totalCount" }]);

                            case 2:
                                lstCount = _context11.sent;

                                console.log(lstCount);
                                _count = lstCount.length > 0 ? lstCount[0]['totalCount'] : 0;
                                _context11.next = 7;
                                return _cart.CartModel.find({ userId: args.userId }).populate('book').limit(args.limit == 0 ? _count : args.limit).skip(args.offset);

                            case 7:
                                _carts = _context11.sent;
                                return _context11.abrupt('return', {
                                    count: _count,
                                    Carts: _carts

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
                                });

                            case 9:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, undefined);
            }));

            return function carts(_x16, _x17) {
                return _ref8.apply(this, arguments);
            };
        }(),

        galleryItems: function () {
            var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(root, args) {
                var lstCount, _count, _items;

                return _regenerator2.default.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return _gallery.GalleryModel.aggregate([{ $match: { title: args.title } }, {
                                    $count: "totalCount"
                                }]);

                            case 2:
                                lstCount = _context12.sent;
                                _count = lstCount.length > 0 ? lstCount[0]['totalCount'] : 0;
                                _context12.next = 6;
                                return _gallery.GalleryModel.find() //{ title: args.title }
                                .populate('items').limit(args.limit == 0 ? _count : args.limit).skip(args.offset);

                            case 6:
                                _items = _context12.sent;
                                return _context12.abrupt('return', {
                                    count: _count,
                                    GalleryItems: _items
                                });

                            case 8:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, undefined);
            }));

            return function galleryItems(_x18, _x19) {
                return _ref9.apply(this, arguments);
            };
        }(),
        galleryItemsCursor: function () {
            var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(root, _ref11) {
                var title = _ref11.title,
                    limit = _ref11.limit,
                    cursor = _ref11.cursor;

                var _items, newCursor, nextItems;

                return _regenerator2.default.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _context13.next = 2;
                                return _gallery.GalleryModel.find({
                                    title: { $regex: new RegExp(title, "i") },
                                    timeStamp: { $gt: cursor || '' }
                                }).sort('timeStamp').limit(limit);

                            case 2:
                                _items = _context13.sent;
                                newCursor = _items.length ? _items[_items.length - 1].timeStamp : null;
                                _context13.next = 6;
                                return _gallery.GalleryModel.find({
                                    title: {
                                        $regex: new RegExp(title, "i")
                                    },
                                    timeStamp: { $gt: newCursor || '' }
                                }).limit(5);

                            case 6:
                                nextItems = _context13.sent;
                                return _context13.abrupt('return', {
                                    GalleryItems: _items,
                                    cursor: _items.length ? _items[_items.length - 1].timeStamp : null,
                                    hasMore: nextItems.length > 0 ? true : false
                                });

                            case 8:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, undefined);
            }));

            return function galleryItemsCursor(_x20, _x21) {
                return _ref10.apply(this, arguments);
            };
        }()
    },

    Book: {
        author: function () {
            var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(args) {
                return _regenerator2.default.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _context14.next = 2;
                                return _author.AuthorModel.findById(args.authorID);

                            case 2:
                                return _context14.abrupt('return', _context14.sent);

                            case 3:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee14, undefined);
            }));

            return function author(_x22) {
                return _ref12.apply(this, arguments);
            };
        }(),
        ratings: function () {
            var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(args) {
                return _regenerator2.default.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _context15.next = 2;
                                return _rating.RatingModel.find({ bookId: args._id });

                            case 2:
                                return _context15.abrupt('return', _context15.sent);

                            case 3:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, _callee15, undefined);
            }));

            return function ratings(_x23) {
                return _ref13.apply(this, arguments);
            };
        }(),
        AverageRating: function () {
            var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(args) {
                var rating;
                return _regenerator2.default.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                _context16.next = 2;
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
                                rating = _context16.sent;
                                return _context16.abrupt('return', rating);

                            case 4:
                            case 'end':
                                return _context16.stop();
                        }
                    }
                }, _callee16, undefined);
            }));

            return function AverageRating(_x24) {
                return _ref14.apply(this, arguments);
            };
        }()
    },

    Cart: {
        book: function () {
            var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(args) {
                return _regenerator2.default.wrap(function _callee17$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                _context17.next = 2;
                                return _book.BookModel.findById(args.bookId);

                            case 2:
                                return _context17.abrupt('return', _context17.sent);

                            case 3:
                            case 'end':
                                return _context17.stop();
                        }
                    }
                }, _callee17, undefined);
            }));

            return function book(_x25) {
                return _ref15.apply(this, arguments);
            };
        }()
    },

    Mutation: {
        addBook: function addBook(root, args) {
            var _this4 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
                var book;
                return _regenerator2.default.wrap(function _callee18$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                _context18.next = 2;
                                return _book.BookModel.create(args);

                            case 2:
                                book = _context18.sent;
                                return _context18.abrupt('return', book);

                            case 4:
                            case 'end':
                                return _context18.stop();
                        }
                    }
                }, _callee18, _this4);
            }))();
        },
        updateBook: function updateBook(root, args) {
            var _this5 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
                var book;
                return _regenerator2.default.wrap(function _callee19$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                _context19.next = 2;
                                return _book.BookModel.findById(args.id);

                            case 2:
                                book = _context19.sent;

                                book.name = args.name;
                                book.pages = args.pages;
                                book.image = args.image;
                                book.authorID = args.authorID;
                                book.price = args.price;
                                book.description = args.description;
                                book.language = args.language;
                                book.publishYear = args.publishYear;
                                book.category = args.category;
                                _context19.next = 14;
                                return book.save();

                            case 14:
                                return _context19.abrupt('return', book);

                            case 15:
                            case 'end':
                                return _context19.stop();
                        }
                    }
                }, _callee19, _this5);
            }))();
        },
        addCart: function addCart(root, args) {
            var _this6 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20() {
                var cart, cart_count, _count;

                return _regenerator2.default.wrap(function _callee20$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                                _context20.next = 2;
                                return _cart.CartModel.create(args);

                            case 2:
                                cart = _context20.sent;
                                _context20.next = 5;
                                return _cart.CartModel.aggregate([{ $match: { userId: args.userId.toString() } }, {
                                    $group: {
                                        _id: "$userId",
                                        count: { $sum: 1 }
                                    }
                                }]);

                            case 5:
                                cart_count = _context20.sent;
                                _count = 0;

                                cart_count.length > 0 ? _count = cart_count[0].count : null;

                                pubsub.publish(CARTADDED, {
                                    cartAdded: {
                                        count: _count
                                    }
                                });

                                return _context20.abrupt('return', cart);

                            case 10:
                            case 'end':
                                return _context20.stop();
                        }
                    }
                }, _callee20, _this6);
            }))();
        },


        removeCart: function () {
            var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(root, args) {
                var deletedItem, cart_count, _count;

                return _regenerator2.default.wrap(function _callee21$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                _context21.next = 2;
                                return _cart.CartModel.findByIdAndDelete(args.id);

                            case 2:
                                deletedItem = _context21.sent;
                                _context21.next = 5;
                                return _cart.CartModel.aggregate([{ $match: { userId: args.userId.toString() } }, {
                                    $group: {
                                        _id: "$userId",
                                        count: { $sum: 1 }
                                    }
                                }]);

                            case 5:
                                cart_count = _context21.sent;
                                _count = 0;

                                _count = cart_count.length > 0 ? cart_count[0].count : 0;

                                pubsub.publish(CARTADDED, {
                                    cartAdded: {
                                        count: _count
                                    }
                                });

                                return _context21.abrupt('return', {
                                    count: _count,
                                    id: deletedItem.id
                                });

                            case 10:
                            case 'end':
                                return _context21.stop();
                        }
                    }
                }, _callee21, undefined);
            }));

            return function removeCart(_x26, _x27) {
                return _ref16.apply(this, arguments);
            };
        }(),

        addRating: function addRating(root, args) {
            var _this7 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22() {
                var book, ratings, total, count, rating;
                return _regenerator2.default.wrap(function _callee22$(_context22) {
                    while (1) {
                        switch (_context22.prev = _context22.next) {
                            case 0:
                                _context22.next = 2;
                                return _book.BookModel.findById(args.bookId);

                            case 2:
                                book = _context22.sent;
                                _context22.next = 5;
                                return _rating.RatingModel.find({ bookId: args.bookId });

                            case 5:
                                ratings = _context22.sent;
                                total = 0, count = 0;

                                if (ratings && ratings.length > 0) {
                                    ratings.map(function (a) {
                                        total = total + a.rating, count++;
                                    });
                                }

                                count++;

                                book.averageRating = ((total + args.rating) / count).toFixed(1);
                                book.ratingCount = count;

                                _context22.next = 13;
                                return _rating.RatingModel.create(args);

                            case 13:
                                rating = _context22.sent;
                                _context22.next = 16;
                                return book.save();

                            case 16:

                                pubsub.publish(RATINGADDED, {
                                    ratingAdded: {
                                        count: count
                                    }
                                });

                                return _context22.abrupt('return', rating);

                            case 18:
                            case 'end':
                                return _context22.stop();
                        }
                    }
                }, _callee22, _this7);
            }))();
        },
        addUser: function addUser(root, args) {
            var _this8 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23() {
                var user;
                return _regenerator2.default.wrap(function _callee23$(_context23) {
                    while (1) {
                        switch (_context23.prev = _context23.next) {
                            case 0:
                                _context23.next = 2;
                                return _user.UserModel.create(args);

                            case 2:
                                user = _context23.sent;
                                return _context23.abrupt('return', user);

                            case 4:
                            case 'end':
                                return _context23.stop();
                        }
                    }
                }, _callee23, _this8);
            }))();
        },
        addAuthor: function addAuthor(root, args) {
            var _this9 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24() {
                var author;
                return _regenerator2.default.wrap(function _callee24$(_context24) {
                    while (1) {
                        switch (_context24.prev = _context24.next) {
                            case 0:
                                _context24.next = 2;
                                return _author.AuthorModel.create(args);

                            case 2:
                                author = _context24.sent;
                                return _context24.abrupt('return', author);

                            case 4:
                            case 'end':
                                return _context24.stop();
                        }
                    }
                }, _callee24, _this9);
            }))();
        },
        removeAuthor: function removeAuthor(root, args) {
            var _this10 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25() {
                var author;
                return _regenerator2.default.wrap(function _callee25$(_context25) {
                    while (1) {
                        switch (_context25.prev = _context25.next) {
                            case 0:
                                _context25.next = 2;
                                return _author.AuthorModel.findByIdAndDelete(args.id);

                            case 2:
                                author = _context25.sent;
                                return _context25.abrupt('return', author);

                            case 4:
                            case 'end':
                                return _context25.stop();
                        }
                    }
                }, _callee25, _this10);
            }))();
        },
        addGalleryItem: function addGalleryItem(root, args) {
            var _this11 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26() {
                var galleryItem;
                return _regenerator2.default.wrap(function _callee26$(_context26) {
                    while (1) {
                        switch (_context26.prev = _context26.next) {
                            case 0:
                                _context26.next = 2;
                                return _gallery.GalleryModel.create(args);

                            case 2:
                                galleryItem = _context26.sent;
                                return _context26.abrupt('return', galleryItem);

                            case 4:
                            case 'end':
                                return _context26.stop();
                        }
                    }
                }, _callee26, _this11);
            }))();
        },
        removeGalleryItem: function removeGalleryItem(root, args) {
            var _this12 = this;

            return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27() {
                var galleryItem;
                return _regenerator2.default.wrap(function _callee27$(_context27) {
                    while (1) {
                        switch (_context27.prev = _context27.next) {
                            case 0:
                                _context27.next = 2;
                                return _gallery.GalleryModel.findByIdAndDelete(args.id);

                            case 2:
                                galleryItem = _context27.sent;
                                return _context27.abrupt('return', galleryItem);

                            case 4:
                            case 'end':
                                return _context27.stop();
                        }
                    }
                }, _callee27, _this12);
            }))();
        }
    },

    Subscription: {
        cartAdded: {
            subscribe: function subscribe() {
                return pubsub.asyncIterator(CARTADDED);
            }
        },
        ratingAdded: {
            subscribe: function subscribe() {
                return pubsub.asyncIterator(RATINGADDED);
            }
        }
    }
};

var auth = function auth(req, res, next) {

    var token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ msg: 'No token, authorizaton denied' });

    try {
        var decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};