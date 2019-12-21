const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: String,
    bookId: String,
})

export const CartModel = mongoose.model('Cart', cartSchema)