import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/findBook.css";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FindBook() {
  const [books, setBooks] = useState([]);
  const [booksById, setBooksById] = useState({
    Name: "",
    Author: "",
    Pages: "",
    Rating: "",
    Genres: [],
    Status: "",
    Holder: "",
  });
  const [bookId, setBookId] = useState("");
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
      return 1;
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    if (checkFields()) {
      setBooks([]);
      console.log("Form data:", formData);
      axios
        .get(
          `http://localhost:5000/find/${formData.searchData}/${formData.searchParam}`
        )
        .then((res) => {
          if (res.data.length !== 0) {
            console.log(res);
            setBooks(res.data);
          } else {
            notify();
          }
        })
        .catch((err) => {
          notify();
          console.log(err);
        });
    } else {
      notify();
      console.log("Error finding book.");
    }
  };

  const handleSubmitById = (e) => {
    e.preventDefault();
    console.log("ID entered:", bookId);
    if (checkId()) {
      setBooksById({
        ...booksById,
        Name: "",
        Author: "",
        Pages: "",
        Rating: "",
        Genres: "",
        Status: "",
        Holder: "",
      });
      console.log("Form data:", formData);
      axios
        .get(`http://localhost:5000/find/${bookId}`)
        .then((res) => {
          if (res.data._id) {
            console.log(res);
            setBooksById({
              ...booksById,
              Name: res.data.Name,
              Author: res.data.Author,
              Pages: res.data.Pages,
              Rating: res.data.Rating,
              Genres: res.data.Genres,
              Status: res.data.Status,
              Holder: res.data.Holder,
            });
          } else {
            notify();
            console.log("Result", res);
          }
          console.log(booksById);
        })
        .catch((err) => {
          notify();
          console.log(err);
        });
    } else {
      notify();
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

  const notify = () =>
    toast.error("Cannot find book.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return (
    <div className="findBookMainContainer">
      <div className="findBookTopContainer">
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
                <option className="dropdownItem" value="6">
                  Status
                </option>
                <option className="dropdownItem" value="7">
                  Holder
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
            <div className="findBookResultContainer">
              <p className="bookId">ID: {book._id}</p>
              <p className="bookName">Name: {book.Name}</p>
              <p className="bookAuthor">Status: {book.Status}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="findBookBottomContainer">
        <div className="findBookLeftContainer">
          <h1>Find book by ID</h1>
          <br />
          <form method="get" onSubmit={handleSubmitById}>
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
        <div className="findBookRightContainerById">
          <div className="bookContainerById">
            <p className="bookByIdInfo">Name: {booksById.Name}</p>
            <p className="bookByIdInfo">Author: {booksById.Author}</p>
            <p className="bookByIdInfo">Pages: {booksById.Pages}</p>
            <p className="bookByIdInfo">Rating: {booksById.Rating}</p>
            <p className="bookByIdInfo">
              Genres: {booksById.Genres && booksById.Genres.join(", ")}
            </p>
            <p className="bookByIdInfo">Status: {booksById.Status}</p>
            <p className="bookByIdInfo">Holder: {booksById.Holder}</p>
          </div>
        </div>
      </div>
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
        transition={Bounce}
      />
    </div>
  );
}

export default FindBook;
