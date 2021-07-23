const mongoose = require("mongoose");

// Populate the bookUIDs field with virtual attribute from bookInventory schema

// If a book with ISBN:990881  has 2 copies, then bookUIDs would look like
// bookUIDs: [990881-PHY-1,990881-PHY-2], where PHY is the bookSubjectCode

const completeInventorySchema = mongoose.Schema({
  bookUIDs: {
    type: [String],

    required: true,
  },

  ISBN: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookInventory",
    required: true,
  },
});

exports.CompleteInventory = mongoose.model(
  "CompleteInventory",
  completeInventorySchema
);
