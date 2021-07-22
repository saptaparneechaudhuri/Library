const mongoose = require("mongoose");


const completeInventorySchema = mongoose.Schema({
    "bookDetails": {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'BookInventory',
        required:true
    }
})

exports.CompleteInventory = mongoose.model('CompleteInventory', completeInventorySchema);