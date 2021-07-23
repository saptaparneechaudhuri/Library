const express = require("express");
const router = express.Router();

const { BookInventory } = require("../models/bookInventory");
const { CompleteInventory } = require("../models/completeInventory");

// Get the complete inventory of all books or add a query to get completely inventory of a book with isbn passed as query parameter
router.get("/", async (req, res) => {
  let filter = {};
  if (req.query.isbn) {
    filter = { ISBN: req.query.isbn };
  }
  const inventory = await CompleteInventory.find(filter).populate("ISBN");

  inventory.map((item) => {
    console.log(item.ISBN.ISBN);
  });

  res.send(inventory);
});

module.exports = router;
