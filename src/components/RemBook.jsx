import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/remBook.css";
import axios from "axios";
import "../styles/remBook.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RemBook() {
  const [bookId, setBookId] = useState("");

  const checkId = () => {
    if (!bookId) {
      alert("Please enter book ID");
      return 0;
    } else {
      return 1;
    }
  };

  const notify = () =>
    toast.info("Declined book deletion.", {
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

  const successDeletion = () =>
    toast.success("Book deleted successfully.", {
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

  const failureDeletion = () =>
    toast.error("Book not found.", {
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

  const confirmDeletion = (e) => {
    e.preventDefault();
    if (checkId()) {
      confirmAlert({
        title: "Warning",
        message: "Are you sure to delete this book.",
        buttons: [
          {
            label: "Yes",
            onClick: () => handleSubmitById(),
          },
          {
            label: "No",
            onClick: () => {
              notify();
            },
          },
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
      });
    }
  };

  const handleSubmitById = () => {
    console.log("ID entered:", bookId);
    if (checkId()) {
      axios
        .delete(`http://localhost:5000/delete/${bookId}`)
        .then((res) => {
          console.log("Deletion result", res);
          if (res.status === 200) {
            console.log(res);
            successDeletion();
          } else {
            failureDeletion();
          }
        })
        .catch((err) => {
          console.log("Cannot find described book", err);
          failureDeletion();
        });
    } else {
      console.log("Cannot delete book.");
      failureDeletion();
    }
  };

  return (
    <div className="removeBookMainContainer">
      <div className="removeBookTopContainer">
        <div className="removeBookLeftContainer">
          <h1>Remove book</h1>
          <br />
          <form onSubmit={confirmDeletion}>
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
            <input type="submit" className="submitBtn" value="Delete Book" />
          </form>
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

export default RemBook;
