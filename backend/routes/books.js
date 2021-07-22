const express = require("express");
const router = express.Router();

const {BookInventory} = require("../models/bookInventory");

// Get the list of books from database
router.get(`/`, async(req,res) => {
    const bookList = await BookInventory.find();
     if (!bookList) {
        res.status(500).json({ success: false });
    }
    res.send(bookList);
    
    
})


// Get a single book detail by id
router.get(`/:id`, async (req, res) => {
    const book = await BookInventory.findById(req.params.id);

    if (!book) {
        res.status(500).json({ success: false });
    }
    res.send(book);
});


// router.post("/",(req,res) => {
//     const newbook = req.body
//     res.send(newbook);
// })

module.exports = router;