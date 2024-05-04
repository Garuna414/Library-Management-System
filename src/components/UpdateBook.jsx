import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/updateBook.css";
import axios from "axios";

function UpdateBook() {
  const [booksById, setBooksById] = useState({
    Name: "",
    Author: "",
    Pages: "",
    Rating: "",
    Genres: [],
  });
  const [bookId, setBookId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: "",
    rating: "",
    genres: "",
  });

  const checkFields = () => {
    if (!formData.title) {
      formData.title = booksById.Name;
    }
    if (!formData.author) {
      formData.author = booksById.Author;
    }
    if (!formData.pages) {
      formData.pages = booksById.Pages;
    }
    if (!formData.rating) {
      formData.rating = booksById.Rating;
    }
    if (!formData.genres) {
      formData.genres = booksById.Genres.join(",");
    }
    console.log(formData);
    return 1;
  };

  const checkId = () => {
    if (!bookId) {
      alert("Please enter book ID");
      return 0;
    } else {
      console.log(typeof formData.rating);
      return 1;
    }
  };

  const handleSubmitById = (e) => {
    e.preventDefault();
    console.log("ID entered:", bookId);
    if (checkId()) {
      alert("Finding book...");
      console.log("Form data:", formData);
      axios
        .get(`http://localhost:5000/find/${bookId}`)
        .then((res) => {
          console.log(res);
          setBooksById({
            ...booksById,
            Name: res.data.Name,
            Author: res.data.Author,
            Pages: res.data.Pages,
            Rating: res.data.Rating,
            Genres: res.data.Genres,
          });
          console.log(booksById);
        })
        .catch((err) => {
          alert("Cannot find described book.");
        });
    } else {
      alert("Cannot find book.");
      console.log("Form data:", formData);
    }
  };

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "pages" || name === "rating" ? parseInt(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    if (checkFields()) {
      axios
        .put(`http://localhost:5000/update/${bookId}`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }) //Without the headers field, the form doesnt work.
        .then((res) => {
          alert("Book updated successfully");
          console.log("Form data:", formData);
          console.log(res);
          setFormData({
            title: "",
            author: "",
            pages: "",
            rating: "",
            genres: "",
          });
        });
    } else {
      alert("Cannot update book.");
      console.log("Form data:", formData);
    }
  };

  return (
    <div className="updateBookMainContainer">
      <div className="updateBookTopContainer">
        <div className="updateBookLeftContainer">
          <h1>Find book by ID</h1>
          <br />
          <form onSubmit={handleSubmitById}>
            <div className="dropdown">
              <div className="idSearchParamBox">
                <p className="idSearchParam">Book ID</p>
              </div>
              <input
                type="text"
                name="title"
                className="formInput"
                id="searchData"
                value={bookId}
                onChange={(e) => {
                  setBookId(e.target.value);
                }}
              />
            </div>
            <br />
            <input type="submit" className="submitBtn" value="Find Book" />
          </form>
        </div>
        <div className="updateBookRightContainer">
          <div className="bookContainerById">
            <p className="bookByIdInfo">Name: {booksById.Name}</p>
            <p className="bookByIdInfo">Author: {booksById.Author}</p>
            <p className="bookByIdInfo">Pages: {booksById.Pages}</p>
            <p className="bookByIdInfo">Rating: {booksById.Rating}</p>
            <p className="bookByIdInfo">
              Genres: {booksById.Genres.join(", ")}
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h1>Add a book</h1>
      <div className="updateBookBottomContainer">
        <form onSubmit={handleUpdateFormSubmit} className="updateForm">
          <div className="formField">
            <label id="title" className="labelText">
              Title of book
            </label>
            <input
              type="text"
              name="title"
              className="formInput"
              id="title"
              value={formData.title}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <div className="formField">
            <label id="author" className="labelText">
              Author of book
            </label>
            <input
              type="text"
              name="author"
              className="formInput"
              id="author"
              value={formData.author}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <div className="formField">
            <label id="pages" className="labelText">
              Number of pages
            </label>
            <input
              type="number"
              name="pages"
              className="formInput"
              id="pages"
              value={formData.pages}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <div className="formField">
            <label id="rating" className="labelText">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              className="formInput"
              id="rating"
              value={formData.rating}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <div className="formField">
            <label id="genre" className="labelText">
              Comma separated genres
            </label>
            <input
              type="text"
              name="genres"
              className="formInput"
              id="genres"
              value={formData.genres}
              onChange={handleUpdateFormChange}
            />
          </div>
          <br />
          <input type="submit" className="submitBtn" value="Update Book" />
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;
