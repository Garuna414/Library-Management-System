import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/findBook.css";

function FindBook() {
  const [searchParam, setSearchParam] = useState(0);
  const [formData, setFormData] = useState("");

  const checkFields = () => {
    if (!formData) {
      alert("Please enter search data");
      return 0;
    }
    if (!searchParam) {
      alert("Please select a search parameter");
      return 0;
    } else {
      console.log(typeof formData.rating);
      return 1;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkFields()) {
      alert("Finding book...");
      console.log("Form data:", formData, typeof formData);
    } else {
      alert("Cannot find book.");
      console.log("Form data:", formData);
    }
  };

  const changeSearchParam = (number) => {
    setSearchParam(number);
  };

  return (
    <div className="findBookMainContainer">
      <h1>Find your book</h1>
      <br />
      <form /*action="/find" method="get"*/ onSubmit={handleSubmit}>
        <div className="dropdown">
          <select className="form-select" aria-label="Default select example">
            <option
              className="dropdownItem"
              onClick={() => changeSearchParam(0)}
              value="0"
              selected
            >
              Select
            </option>
            <option
              className="dropdownItem"
              onClick={() => changeSearchParam(1)}
              value="1"
            >
              Book name
            </option>
            <option
              className="dropdownItem"
              onClick={() => changeSearchParam(2)}
              value="2"
            >
              Author name
            </option>
            <option
              className="dropdownItem"
              onClick={() => changeSearchParam(3)}
              value="3"
            >
              Number of pages
            </option>
            <option
              className="dropdownItem"
              onClick={() => changeSearchParam(4)}
              value="4"
            >
              Rating
            </option>
            <option
              className="dropdownItem"
              onClick={() => changeSearchParam(5)}
              value="5"
            >
              Genre
            </option>
          </select>
          <input
            type="text"
            name="title"
            className="formInput"
            id="title"
            value={formData}
            onChange={(e) => {
              setFormData(e.target.value);
            }}
          />
        </div>
        <br />
        <input type="submit" className="submitBtn" value="Find Book" />
      </form>
    </div>
  );
}

export default FindBook;
