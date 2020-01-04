const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String,
    pages: Number,

    price: String,
    description: String,
    language: String,
    publishYear: String,
    category: String,


    authorID: String,
    image: String,

    averageRating: Number,
    ratingCount: Number,

})

export const BookModel = mongoose.model('Book', bookSchema);