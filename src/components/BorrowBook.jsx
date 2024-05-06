import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/borrowBook.css";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BorrowBook() {
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
    userId: "",
    searchParam: "",
  });

  const checkFields = () => {
    if (!formData.userId) {
      alert("Please enter user ID.");
      return 0;
    } else if (!formData.searchParam || formData.searchParam === 0) {
      alert("Please select check out method.");
      return 0;
    } else {
      console.log(formData);
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

  const handleSubmitById = (e) => {
    e.preventDefault();
    console.log("ID entered:", bookId);
    if (checkId()) {
      console.log("Form data:", formData);
      axios
        .get(`http://localhost:5000/find/${bookId}`)
        .then((res) => {
          if (res.status !== 404) {
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
            failureNotify();
          }
          console.log(booksById);
        })
        .catch((err) => {
          failureNotify();
          console.log(err);
        });
    } else {
      failureNotify();
      console.log("Form data:", formData);
    }
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    if (checkFields()) {
      axios
        .put(`http://localhost:5000/borrow/${bookId}`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }) //Without the headers field, the form doesnt work.
        .then((res) => {
          setFormData({
            ...formData,
            userIdId: "",
          });
          notify();
        })
        .catch((err) => {
            checkOutFailire();
          console.log(err);
        });
    } else {
        checkOutFailire();
    }
  };

  const notify = () =>
    toast.success("Book checked out successfully.", {
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

  const failureNotify = () =>
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

  const checkOutFailire = () =>
    toast.error("Cannot check out book.", {
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

  const changeSearchParam = (value) => {
    setFormData({
      ...formData,
      searchParam: parseInt(value),
    });
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
              Genres: {booksById.Genres && booksById.Genres.join(", ")}
            </p>
            <p className="bookByIdInfo">Status: {booksById.Status}</p>
            <p className="bookByIdInfo">Holder: {booksById.Holder}</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h1>Check Out Form</h1>
      <div className="updateBookBottomContainer">
        <form onSubmit={handleUpdateFormSubmit} className="updateForm">
          <div className="borrowFormField">
            <label id="title" className="labelText">
              User ID
            </label>
            <input
              type="text"
              name="title"
              className="updateBookFormInput"
              id="title"
              value={formData.userId}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  userId: e.target.value,
                });
              }}
            />
          </div>
          <br />
          <div>
            <select
              className="form-select"
              aria-label="Default select example"
              value={formData.searchParam}
              onChange={(e) => changeSearchParam(e.target.value)}
            >
              <option className="dropdownItem" defaultValue="0">
                Select
              </option>
              <option
                className="dropdownItem"
                value="1"
                disabled={booksById.Status !== "Available"}
              >
                Borrow
              </option>
              <option
                className="dropdownItem"
                value="2"
                disabled={booksById.Status === "Available"}
              >
                Return
              </option>
            </select>
          </div>
          <br />
          <input type="submit" className="submitBtn" value="Check Out" />
        </form>
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

export default BorrowBook;
