const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

// get list of users, exclude password information
router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
});

// get a user by id,exclude passwordhash
router.get(`/:id`, async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  // console.log(book.bookUID);

  if (!user) {
    res.status(500).json({ success: false });
  }

  res.send(user);
});

//user register

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  });

  user = await user.save();

  if (!user) return res.status(500).send("User not added");

  res.send(user);
});

// user login

router.post("/login", async (req, res) => {
  // FInd if the user exits by its email
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!user) {
    return res.status(500).send("User not found");
  }

  // if user exists, compare the password entered from frontend to the password stored in database
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("password is wrong!");
  }
});

// Update librray_tokens of a user
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid User Id");
  }
  mongoose.set("useFindAndModify", false);

  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).send("User Not found!");

  const updatedLibraryToken = await User.findByIdAndUpdate(
    req.params.id,
    {
      library_tokens: req.body.library_tokens,
    },
    { new: true }
  );

  if (!updatedLibraryToken)
    return res.status(500).send("the token cannot be updated!");

  res.send(updatedLibraryToken);
});

module.exports = router;
