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
  },
  { collection: "Books" }
);

var Book = mongoose.model("Book", bookSchema);

app.post("/add", function (req, res) {
  //res.sendFile(__dirname + "/form.html");
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

app.listen(5000);
