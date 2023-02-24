const express = require("express")

const router = express.Router();

const registerUser = require("../controllers/userController");
const authUser = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const authMiddleware= require("../middleware/authMiddleware");


router.post("/register",registerUser.registerUser);
router.post("/login", authUser.authUser);


router.post("/books" ,authMiddleware.protect,bookController.createBook)
router.get("/books",bookController.getBooksData)
router.put("/books/:bookId",authMiddleware.protect,bookController.updatedBook)
router.delete("/books/:bookId",authMiddleware.protect,bookController.deleteBookId)

module.exports = router;