//const { json, express } = require('express');
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/Library");

var bookSchema = mongoose.Schema(
  {
    Name: String,
    Author: String,
    Pages: Number,
    Rating: Number,
    Genres: [String],
    Status: String,
    Holder: String,
  },
  { collection: "Books" }
);

var Book = mongoose.model("Book", bookSchema);

app.post("/add", function (req, res) {
  var bookInfo = req.body; // Get the parsed information from the form
  console.log(bookInfo);
  if (
    !bookInfo.title ||
    !bookInfo.author ||
    !bookInfo.pages ||
    !bookInfo.rating ||
    !bookInfo.genres
  ) {
    res.send("Missing fields cannot add book");
  } else {
    var genresArray = bookInfo.genres.split(",");
    console.log(genresArray);
    var newBook = new Book({
      Name: bookInfo.title,
      Author: bookInfo.author,
      Pages: bookInfo.pages,
      Rating: bookInfo.rating,
      Genres: genresArray,
      Status: "Available",
      Holder: "Library",
    });

    newBook
      .save()
      .then((book) => {
        res.send("Data added successfully");
      })
      .catch((err) => {
        res.send("Error adding data");
      });
  }
});

app.get("/find/:searchData/:searchParam", function (req, res) {
  var searchData = req.params.searchData;
  var searchParam = req.params.searchParam;
  //console.log(bookInfo);
  if (!searchData) {
    res.send("mt");
  } else {
    if (parseInt(searchParam) === 0) {
      res.send("Select a search parameter first.");
    } else if (parseInt(searchParam) === 1) {
      Book.find({ Name: searchData })
        .then((book) => {
          res.json(book);
        })
        .catch((err) => {
          res.send(err);
        });
    } else if (parseInt(searchParam) === 2) {
      Book.find({ Author: searchData })
        .then((book) => {
          res.json(book);
        })
        .catch((err) => {
          res.send(err);
        });
    } else if (parseInt(searchParam) === 3) {
      Book.find({ Pages: parseInt(searchData) })
        .then((book) => {
          res.json(book);
        })
        .catch((err) => {
          res.send(err);
        });
    } else if (parseInt(searchParam) === 4) {
      Book.find({ Rating: parseInt(searchData) })
        .then((book) => {
          res.json(book);
        })
        .catch((err) => {
          res.send(err);
        });
    } else if (parseInt(searchParam) === 5) {
      Book.find({ Name: searchData })
        .then((book) => {
          res.json(book);
        })
        .catch((err) => {
          res.send(err);
        });
    } else if (parseInt(searchParam) === 6) {
      Book.find({ Status: searchData })
        .then((book) => {
          res.json(book);
        })
        .catch((err) => {
          res.send(err);
        });
    } else if (parseInt(searchParam) === 7) {
      Book.find({ Holder: searchData })
        .then((book) => {
          res.json(book);
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send("Cannot find book");
    }
  }
});

app.get("/find/:bookId", function (req, res) {
  var bookId = req.params.bookId;
  if (!bookId) {
    res.send("Please enter book ID");
  } else {
    Book.findById(bookId)
      .then((book) => {
        res.json(book);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  }
});

app.put("/update/:bookId", function (req, res) {
  var bookId = req.params.bookId;
  var body = req.body;
  if (!bookId) {
    res.send("Please enter book ID.");
  } else {
    var genresArray = body.genres.split(",");
    Book.findByIdAndUpdate(
      { _id: bookId },
      {
        Name: body.title,
        Author: body.author,
        Pages: body.pages,
        Rating: body.rating,
        Genres: genresArray,
      }
    )
      .then((book) => {
        res.json(book);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

app.delete("/delete/:bookId", function (req, res) {
  var bookId = req.params.bookId;
  if (!bookId) {
    res.send("Please enter book ID.");
  } else {
    Book.findByIdAndDelete(bookId)
      .then((book) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  }
});

app.put("/borrow/:bookId", function (req, res) {
  var bookId = req.params.bookId;
  var body = req.body;
  var userId = body.userId;
  var status;
  if (body.searchParam == 0) {
    res.send("Please select check out method.");
  } else if (body.searchParam == 1) {
    status = "Borrowed";
  } else if (body.searchParam == 2) {
    status = "Available";
  }
  if (!userId) {
    res.send("Please enter user ID.");
  }
  if (!bookId) {
    res.send("Please enter book ID.");
  } else if (body.searchParam == 1) {
    Book.findByIdAndUpdate(
      { _id: bookId },
      {
        Status: status,
        Holder: userId,
      }
    )
      .then((book) => {
        res.json(book);
      })
      .catch((err) => {
        res.send(err);
      });
  } else if (body.searchParam == 2) {
    Book.findByIdAndUpdate(
      { _id: bookId },
      {
        Status: status,
        Holder: "Library",
      }
    )
      .then((book) => {
        res.json(book);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

app.listen(5000);
