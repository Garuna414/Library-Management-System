import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/Navbar";
import AddBook from "./components/AddBook";
import FindBook from "./components/FindBook";
import UpdateBook from "./components/UpdateBook";

function App() {
  return (
    <BrowserRouter>
      <div className="topContainer">
        <Navbar />
      </div>
      <div className="bottomContainer">
        <Routes>
          <Route exact path="/addBook" element={<AddBook />}></Route>
          <Route exact path="/findBook" element={<FindBook />}></Route>
          <Route exact path="/updateBook" element={<UpdateBook />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
