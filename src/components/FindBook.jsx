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
      console.log("Form data:", formData, typeof(formData));
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
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul className="dropdown-menu">
            <li className="dropdownItem" onClick={() => changeSearchParam(1)}>
              Book name
            </li>
            <li className="dropdownItem" onClick={() => changeSearchParam(2)}>
              Author name
            </li>
            <li className="dropdownItem" onClick={() => changeSearchParam(3)}>
              Number of pages
            </li>
            <li className="dropdownItem" onClick={() => changeSearchParam(4)}>
              Rating
            </li>
            <li className="dropdownItem" onClick={() => changeSearchParam(5)}>
              Genre
            </li>
          </ul>
          <input
            type="text"
            name="title"
            className="formInput"
            id="title"
            value={formData}
            onChange={(e) => {setFormData(e.target.value);}}
          />
        </div>
        <br />
        <input type="submit" className="submitBtn" value="Find Book" />
      </form>
    </div>
  );
}

export default FindBook;