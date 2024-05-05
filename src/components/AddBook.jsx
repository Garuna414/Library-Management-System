import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/addBook.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    pages: "",
    rating: "",
    genres: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "pages" || name === "rating" ? parseInt(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const checkFields = () => {
    if (!formData.title) {
      alert("Title is required!");
      return 0;
    }
    if (!formData.author) {
      alert("Author is required");
      return 0;
    }
    if (!formData.pages) {
      alert("Number of pages is required");
      return 0;
    }
    if (!formData.rating) {
      alert("Rating is required");
      return 0;
    }
    if (parseInt(formData.rating) > 10 || parseInt(formData.rating) < 0) {
      alert("Rating can only range from 0 - 10");
      return 0;
    }
    if (!formData.genres) {
      alert("Genre is required");
      return 0;
    } else {
      return 1;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkFields()) {
      axios
        .post("http://localhost:5000/add", formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }) //Without the headers field, the form doesnt work.
        .then((res) => {
          alert("Form submitted successfully");
          console.log("Form data:", formData);
          setFormData({
            title: "",
            author: "",
            pages: "",
            rating: "",
            genres: "",
          });
          notify();
        });
    } else {
      alert("Cannot insert book to library");
      console.log("Form data:", formData);
    }
  };

  const notify = () =>
    toast.success("Book updated successfully.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: "Bounce",
    });

  return (
    <div className="addBookMainContainer">
      <h1>Add a book</h1>
      <br />
      <form action="/add" method="post" onSubmit={handleSubmit}>
        <div>
          <label id="title" className="labelText">
            Title of book
          </label>
          <br />
          <input
            type="text"
            name="title"
            className="addBookFormInput"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label id="author" className="labelText">
            Author of book
          </label>
          <br />
          <input
            type="text"
            name="author"
            className="addBookFormInput"
            id="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label id="pages" className="labelText">
            Number of pages
          </label>
          <br />
          <input
            type="number"
            name="pages"
            className="addBookFormInput"
            id="pages"
            value={formData.pages}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label id="rating" className="labelText">
            Rating
          </label>
          <br />
          <input
            type="number"
            name="rating"
            className="addBookFormInput"
            id="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label id="genre" className="labelText">
            Comma separated genres
          </label>
          <br />
          <input
            type="text"
            name="genres"
            className="addBookFormInput"
            id="genres"
            value={formData.genres}
            onChange={handleChange}
          />
        </div>
        <br />
        <input type="submit" className="submitBtn" value="Add Book" />
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    </div>
  );
}

export default AddBook;
