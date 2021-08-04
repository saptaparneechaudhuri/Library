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

// Sends the list of books issued for a user by using user Id (TODO)

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
  const userBookList = await IssueReturn.find({ user: req.params.userid });
  console.log(userBookList);

  if (!userBookList) {
    res.status(500).json({ success: false });
  }
  res.send(userBookList);
});

module.exports = router;
