const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gallerySchema = new Schema({
    userId: String,
    userName: String,
    timeStamp: String,
    date: String,
    url: String,
    title: String,
    subHeader: String,
    description: String,
})

export const GalleryModel = mongoose.model('Gallery', gallerySchema)