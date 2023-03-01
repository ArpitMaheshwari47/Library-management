const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const dotenv = require("dotenv")
const userRoute = require("./routes/userRoute")
const bookRoute = require("./routes/bookRoute")

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
})
  .then(() => console.log("MongoDb is connected"))
  .catch(err => console.log(err))

app.use("/", userRoute);
app.use("/", bookRoute);

app.listen(process.env.PORT || 5000, function () {
  console.log("Express app running on port " + (process.env.PORT || 5000));
});
//========================================================================================================================================



