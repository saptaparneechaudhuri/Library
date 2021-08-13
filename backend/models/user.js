const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  library_tokens: {
    type: Number,
    required: true,
    default: 3,
  },
});

// use a virtual to get id as id and not _id

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// userSchema.virtual("library_tokens").get(function () {
//   return 3;
// });

// set the virtuals to show

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
