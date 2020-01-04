const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    rating: Number,
    review: String,
    bookId: String,
    userId: String,
    date: String,
})

export const RatingModel = mongoose.model('Rating', ratingSchema);