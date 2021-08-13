const mongoose = require("mongoose");

const bookInventorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: "String",
    required: true,
    default: "",
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  authors: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    default: "",
  },
  subjectCode: {
    type: String,
    required: true,
    default: "Uncategorized",
  },
});

// // Create a virtual for bookUID. Add this virtual as a field in completeInventory Schema
// let bookInventorySchemaVirtual = bookInventorySchema.virtual("bookUID");
// use a virtual to get id as id and not _id

bookInventorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookInventorySchema.set("toJSON", {
  virtuals: true,
});

// bookInventorySchemaVirtual.get(function () {
//   let res = [];
//   for (let i = 0; i < this.count; i++) {
//     let id = `${this.ISBN}-${this.subjectCode}-${i + 1}`;
//     res.push(id);
//   }
//   return res;
// });

exports.BookInventory = mongoose.model("BookInventory", bookInventorySchema);
