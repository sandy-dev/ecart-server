const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId: String,
    bookId: String,
    date: String,
    //book: { type: Schema.Types.ObjectId, ref: 'Book' },
})

export const CartModel = mongoose.model('Cart', cartSchema)