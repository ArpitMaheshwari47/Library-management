
require("dotenv").config()

const book = require("./models/bookModel")
const connetDb = require("./db/connect")
const bookData = require("./books.json")

const start = async()=>{
    try {
        await connetDb(process.env.MONGO_URL )
        await book.create(bookData)
        console.log("success")
    } catch (error) {
       console.log(error); 
    }
}

start()