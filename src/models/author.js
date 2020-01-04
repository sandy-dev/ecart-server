const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: String,
    age: Number
});

export const AuthorModel = mongoose.model('Author', authorSchema);