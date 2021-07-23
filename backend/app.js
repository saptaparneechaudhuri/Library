const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { bookData } = require("./data/bookInventory");
const { BookInventory } = require("./models/bookInventory");
const cors = require("cors");

require("dotenv/config");

const api = process.env.API_URL;

//routes
const bookInventoryRouter = require("./routes/books");
const completeInventoryRouter = require("./routes/completeInventory");

//middleware
app.use(express.json());
app.use(`${api}/books`, bookInventoryRouter);
app.use(`${api}/completeinventory`, completeInventoryRouter);
app.use(cors());
app.options("*", cors());

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected.");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log("server is running at http://localhost:3000");
});

// Insert many books into the library

// BookInventory.insertMany(bookData, function(err, docs) {
//     if (err){
//           return console.error(err);
//       } else {
//         console.log("Multiple documents inserted to BookInventory collection ");
//       }
// });
