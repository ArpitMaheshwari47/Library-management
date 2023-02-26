const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const dotenv = require("dotenv")
const userRoute = require("./routes/userRoute")
const bookRoute = require("./routes/bookRoute")

const app = express()

const connectDb = require("./db/connect")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()

const start = async()=>{
  try {
    await connectDb(process.env.MONGO_URL )
    app.listen(process.env.PORT || 5000, function () {
      console.log("Express app running on port " + (process.env.PORT || 5000));
    });
    app
  } catch (error) {
    console.log(error)
  }
}

start()

//========================================================================================================================================

app.use("/",userRoute);
app.use("/", bookRoute);


