const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({

    cover:{
        type:String
    },
    title: {
        type: String,
        required: true,
        unqiue: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: objectId,
        ref: "User",
        required: true,
        trim: true
    },
    ISBN: {
        type: String,
        required: true,
        unqiue: true, trim: true
    },
    bookImage:{
        type:String,
        // required:true
    },
   
    deletedAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: true,

    }
  
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema)

module.exports = Book