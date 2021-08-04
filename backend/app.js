const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const authJwt = require("./helpers/jwt");
const morgan = require("morgan");
const errorHandler = require("./helpers/error-handler");

require("dotenv/config");

const api = process.env.API_URL;

//middlewares should be used before calling routes
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
app.use(authJwt());
app.use(errorHandler);

// Routes
const bookInventoryRouter = require("./routes/books");
const completeInventoryRouter = require("./routes/completeInventory");
const bookIssues = require("./routes/issues");
const userRoutes = require("./routes/user");
app.use(`${api}/books`, bookInventoryRouter);
app.use(`${api}/completeinventory`, completeInventoryRouter);
app.use(`${api}/bookissue`, bookIssues);
app.use(`${api}/user`, userRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database Connected.");
  })
  .catch((err) => {
    console.log(err);
  });

// process.env.PORT is for production port

var server = app.listen(process.env.PORT || 3000, () => {
  console.log(api);
  let port = server.address().port;
  console.log("server is running at port " + port);
});

// Insert many books into the library

// BookInventory.insertMany(bookData, function(err, docs) {
//     if (err){
//           return console.error(err);
//       } else {
//         console.log("Multiple documents inserted to BookInventory collection ");
//       }
// });
