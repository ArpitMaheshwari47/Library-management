const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const dotenv = require("dotenv")
const route = require("./routes/route")

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()

app.get("/",(req,res)=>{
    res.send("hello")
})

mongoose.connect("mongodb+srv://yogesh_beldar:Oh9CU4nZCayFGTeC@cluster0.zveoo.mongodb.net/project5"
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

//========================================================================================================================================

app.use("/",route);
// app.use("/api", bookRoutes);

app.listen(process.env.PORT || 5000, function () {
  console.log("Express app running on port " + (process.env.PORT || 5000));
});