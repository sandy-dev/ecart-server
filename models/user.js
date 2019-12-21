const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    uid: String,
    name: String,
    email: String,
    image: String,
});

export const UserModel = mongoose.model('User', userSchema);