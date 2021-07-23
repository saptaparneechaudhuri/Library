const mongoose = require("mongoose");

const issueReturnSchema = mongoose.Schema({});

exports.IssueReturn = mongoose.model("IssueReturn", issueReturnSchema);
