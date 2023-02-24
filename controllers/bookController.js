const Book = require("../models/bookModel");
const User = require("../models/userModel");

const { isValid, isValidString, isValidObjectId, isValidISBN, isValidDate } = require("../middleware/validation");

const createBook = async function (req, res) {
  try {
    let data = req.body;
    let { title, excerpt, userId, ISBN, releasedAt } = data;

    console.log(data)

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Insert Data : BAD REQUEST" });
    }

    if (!isValid(title)) {
      return res.status(400).send({ status: false, message: "Enter Title" });
    }

    if (!isValid(excerpt)) {
      return res.status(400).send({ status: false, message: "Enter Excerpt" });
    }

    if (!isValid(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a User Id" });
    }

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter Valid User Id" });
    }

    if (!isValid(ISBN)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter ISBN Number" });
    }
    if (!isValidISBN(ISBN)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid ISBN Number" });
    }


    if (!isValid(releasedAt)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter releasedAt" });
    }
    if (!isValidDate(releasedAt)) {
      return res.status(400).send({
        status: false,
        message: "Enter a valid releasedAt format - YYYY-MM-DD ",
      });
    }

    let checktitle = await Book.findOne({ title: title });
    if (checktitle)
      return res
        .status(400)
        .send({ status: false, message: "Title already exists" });

    let checkISBN = await Book.findOne({ ISBN: ISBN });
    if (checkISBN)
      return res
        .status(400)
        .send({ status: false, message: "ISBN already exists" });

    let checkUserId = await User.findOne({ _id: userId });
    if (!checkUserId)
      return res
        .status(400)
        .send({ status: false, message: "User Id do not exists" });

  

    let savedData = await Book.create(data);
    console.log(savedData)
    return res.status(201).send({ status: true, message: "Success", data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// const getAllBook = async function (req, res) {

//   try {
//      const queryParams = req.query
//     console.log(queryParams)
//     if (queryParams.userId && !queryParams.userId.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).send({ status: false, message: "Incorrect userId" })
//     }

//     const books = await Book.find({ ...queryParams, isDeleted: false }).sort({ title: 1 }).select('_id title excerpt userId  releasedAt')
//     books.sort((a, b) => a.title.localeCompare(b.title))  // enables case - insenstive and then sort the array

//     if (books && books.length == 0) {
//       return res.status(404).send({ status: false, message: "Books not found" })
//     }
//     return res.status(200).send({ status: true, message: "Books list", data: books })

//   }
//   catch (error) {
//     return res.status(500).send({ status: false, message: error.message })

//   }
// }

const getBooksData = async function (req, res) {
  try {
    let data = req.query;
    let { _id, userId } = data;
    let bookData = { isDeleted: false };

    if (Object.keys(data).length == 0) {
      getBooks = await Book
        .find({ data, isDeleted: false })
        // .select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1, })
        .sort({ title: 1 })
        .populate("userId");
      return res.status(200).send({
        status: true,
        message: "Books list",
        length: getBooks.length,
        data: getBooks,
      });
    }

    if (data.userId) {
      if (!isValidObjectId(data.userId)) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid userId in params" });
      }
    }
    if (_id) {
      bookData._id = _id;
    }
    if (userId) {
      bookData.userId = userId;
    }

    let books = await Book
      .find(bookData)
      // .select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, subcategory: 1, reviews: 1, releasedAt: 1, })
      .sort({ title: 1 })
      .populate("userId");

    if (books.length == 0)
      return res.status(404).send({ status: false, message: "No data found" });
    else
      return res
        .status(200)
        .send({ status: true, message: "Books list", data: books });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


const updatedBook = async function (req, res) {
  try {
    let BookId = req.params.bookId;
    if (!isValidObjectId(BookId)) {
      return res.status(400).send({ status: false, message: "Invalid BookId" });
    }
    let bookToBeUpdted = await Book.findById({ _id: BookId });
    if (Object.keys(bookToBeUpdted).length === 0) {
      return res
        .status(404)
        .send({ status: false, message: "Book does not exist" });
    }

    let data = req.body;
    let { title, excerpt, releasedAt, ISBN } = data;
    if (Object.keys(data).length === 0)
      return res
        .status(400)
        .send({ status: false, message: "Insert Data : Bad Request" });

    if (title) {
      if (!isValidString(title)) {
        return res
          .status(400)
          .send({ status: false, message: "Title is missing ! " });
      }
      const findTitle = await Book.findOne({
        title: title,
        isDeleted: false,
      });
      if (findTitle) {
        return res.status(400).send({
          status: false,
          message: "Title is already exists. Please try a new title.",
        });
      }
    }

    if (excerpt) {
      if (!isValidString(excerpt)) {
        return res
          .status(400)
          .send({ status: false, message: "Excerpt is missing !" });
      }
    }

    if (releasedAt) {
      if (!isValidString(title)) {
        return res
          .status(400)
          .send({ status: false, message: "ReleasedAt is missing !" });
      }
      if (!isValidDate(releasedAt)) {
        return res.status(400).send({
          status: false,
          message: "Enter a valid releasedAt format - YYYY-MM-DD ",
        });
      }
    }

    if (ISBN) {
      if (!isValidString(ISBN)) {
        return res
          .status(400)
          .send({ status: false, message: "ISBN is missing !" });
      }
      if (!isValidISBN(ISBN)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter a valid ISBN Number" });
      }
      const findIsbn = await Book.findOne({
        ISBN: ISBN,
        isDeleted: false,
      });
      if (findIsbn) {
        return res.status(400).send({
          status: false,
          message: "ISBN is already exists. Please try a new ISBN.",
        });
      }
    }

    if (bookToBeUpdted.isDeleted == false) {
      let updatedBook = await Book.findOneAndUpdate(
        { _id: BookId },
        { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN },
        { new: true }
      );
      res.status(200).send({ status: true, data: updatedBook });
    } else {
      return res.status(404).send({
        status: false,
        message: "Unable to update details. Book has been already deleted",
      });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//============================================[Delete Book API By BookId]========================================================================

const deleteBookId = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    let book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .send({ status: "false", message: "No such book exists " });
    }
    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "BookId is required" });

    let data = await Book.findById(bookId);
    if (!data)
      return res
        .status(404)
        .send({ status: false, message: "No such book found" });

    if (data.isDeleted)
      return res.status(404).send({
        status: false,
        message: " Already deleted blog Or Book not exists",
      });

    let timeStamps = new Date();
    await Book.findOneAndUpdate(
      { _id: bookId },
      { $set: { isDeleted: true, deletedAt: timeStamps } },
      { new: true }
    );
    res
      .status(200)
      .send({ status: true, message: "Book is deleted successfully" });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


module.exports = { createBook, getBooksData, updatedBook, deleteBookId }