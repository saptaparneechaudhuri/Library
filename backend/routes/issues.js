const express = require("express");
const router = express.Router();
const multer = require("multer");

const { IssueReturn } = require("../models/issueReturn");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    cb(null, `${fileName}-${Date.now()}`);
  },
});

const uploadOptions = multer({ storage: storage });

// get all books issued

router.get("/", async (req, res) => {
  // const issueList = await IssueReturn.find();
  try {
    const issueList = await IssueReturn.find().populate("user");
    if (!issueList) {
      res.status(500).json({ success: false });
    }

    res.send(issueList);
  } catch (err) {
    console.log(err);
  }

  // console.log(issueList);
});

// Post all the book that users lend
router.post("/", async (req, res) => {
  let book = new IssueReturn({
    booksIssued: req.body.booksIssued,
    image: req.body.image,
    user: req.body.user,
  });

  book = await book.save();

  if (!book) return res.status(500).send("Book cannot be issued");

  res.send(book);
});

// Get the books for a particular user
router.get(`/get/userbooks/:userid`, async (req, res) => {
  const userBookList = await IssueReturn.find({
    user: req.params.userid,
  }).populate("user");
  // console.log(userBookList);

  if (!userBookList) {
    res.status(500).json({ success: false });
  }
  res.send(userBookList);
});

// Delete a book issued by a particular user
router.delete("/get/userbooks/:userid/:bookid", async (req, res) => {
  var user = await IssueReturn.findOne({
    user: req.params.userid,
    booksIssued: req.params.bookid,
  });
  if (user) {
    console.log("user found");
  }
  IssueReturn.findOneAndDelete({
    user: req.params.userid,
    booksIssued: req.params.bookid,
  })
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

// Delete a book
router.delete("/get/userbooks/:id", (req, res) => {
  IssueReturn.findByIdAndRemove(req.params.id)
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
