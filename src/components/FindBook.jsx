import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/findBook.css";
import axios from "axios";

function FindBook() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    searchData: "",
    searchParam: "",
  });

  const checkFields = () => {
    if (!formData.searchData) {
      alert("Please enter search data");
      return 0;
    }
    if (!formData.searchParam) {
      alert("Please select a search parameter");
      return 0;
    } else {
      console.log(typeof formData.rating);
      return 1;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    if (checkFields()) {
      alert("Finding book...");
      console.log("Form data:", formData);
      axios
        .get(
          `http://localhost:5000/find/${formData.searchData}/${formData.searchParam}`
        )
        .then((res) => {
          console.log(res);
          setBooks(res.data);
        })
        .catch((err) => {
          alert("Cannot find described book.");
        });
    } else {
      alert("Cannot find book.");
      console.log("Form data:", formData);
    }
  };

  const changeSearchParam = (value) => {
    setFormData({
      ...formData,
      searchParam: parseInt(value),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      searchData: e.target.value,
    });
  };

  return (
    <div className="findBookMainContainer">
      <div className="findBookLeftContainer">
        <h1>Find your book</h1>
        <br />
        <form method="get" onSubmit={handleSubmit}>
          <div className="dropdown">
            <select
              className="form-select"
              aria-label="Default select example"
              value={formData.searchParam}
              onChange={(e) => changeSearchParam(e.target.value)}
            >
              <option className="dropdownItem" defaultValue="0">
                Select
              </option>
              <option className="dropdownItem" value="1">
                Book name
              </option>
              <option className="dropdownItem" value="2">
                Author name
              </option>
              <option className="dropdownItem" value="3">
                Number of pages
              </option>
              <option className="dropdownItem" value="4">
                Rating
              </option>
              <option className="dropdownItem" value="5">
                Genre
              </option>
            </select>
            <input
              type="text"
              name="title"
              className="formInput"
              id="searchData"
              value={formData.searchData}
              onChange={handleChange}
            />
          </div>
          <br />
          <input type="submit" className="submitBtn" value="Find Book" />
        </form>
      </div>
      <div className="findBookRightContainer">
        {books.map((book) => (
          <div className="bookContainer">
            <p className="bookId">ID: {book._id}</p>
            <p className="bookName">Name: {book.Name}</p>
            <p className="bookAuthor">Author: {book.Author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindBook;
