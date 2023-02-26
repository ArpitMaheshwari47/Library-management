const express = require("express")

const router = express.Router();

const bookController = require("../controllers/bookController");
const authMiddleware= require("../middleware/authMiddleware");


router.post("/books" ,authMiddleware.protect,bookController.createBook)
router.get("/books",bookController.getBooksData)
router.put("/books/:bookId",authMiddleware.protect,bookController.updatedBook)
router.delete("/books/:bookId",authMiddleware.protect,bookController.deleteBook)


module.exports = router;


