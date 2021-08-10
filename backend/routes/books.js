const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { BookInventory } = require("../models/bookInventory");
const { CompleteInventory } = require("../models/completeInventory");

// Get the list of books from database
router.get(`/`, async (req, res) => {
  const bookList = await BookInventory.find();
  if (!bookList) {
    res.status(500).json({ success: false });
  }
  //Fill the fields of CompleteInventory
  //   bookList.map((book) => {
  //     CompleteInventory.create({
  //       ISBN: book._id,
  //       bookUIDs: book.bookUID,
  //     });
  //   });

  res.send(bookList);
});

// Get a single book detail by id

router.get(`/:id`, async (req, res) => {
  const book = await BookInventory.findById(req.params.id);
  // console.log(book.bookUID);

  if (!book) {
    res.status(500).json({ success: false });
  }

  res.send(book);
});

// Post a new book
router.post("/", async (req, res) => {
  let newBook = new BookInventory({
    title: req.body.title,
    image: req.body.image,
    ISBN: req.body.ISBN,
    count: req.body.count,
    authors: req.body.authors,
    description: req.body.description,
    subjectCode: req.body.subjectCode,
  });
  newBook = await newBook.save();
  if (!newBook) return res.status(500).send("The book cannot be created");
  res.send(newBook);
});

// Update a book
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  mongoose.set("useFindAndModify", false);

  const book = await BookInventory.findById(req.params.id);
  if (!book) return res.status(400).send("Invalid Book!");

  const updatedBook = await BookInventory.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      image: req.body.image,
      ISBN: req.body.ISBN,
      count: req.body.count,
      authors: req.body.authors,
      description: req.body.description,
      subjectCode: req.body.subjectCode,
    },
    { new: true }
  );

  if (!updatedBook) return res.status(500).send("the book cannot be updated!");

  res.send(updatedBook);
});

// Delete a book
router.delete("/:id", (req, res) => {
  BookInventory.findByIdAndRemove(req.params.id)
    .then((book) => {
      if (book) {
        return res.status(200).json({
          success: true,
          message: "the book is deleted!",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "book not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
