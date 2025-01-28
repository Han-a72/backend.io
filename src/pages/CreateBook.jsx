import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { MdNavigateNext } from "react-icons/md";
const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const navigate = useNavigate();

  const handleSaveBook = () => {
    if (!title || !author || !publishYear) {
      alert("Please fill in all fields.");
      return;
    }

    const data = {
      title,
      author,
      publishYear,
    };

    axios
      .post("http://localhost:4000/books", data)
      .then(() => {
        navigate("/books/booktable");
      })
      .catch((error) => {
        console.error("Error saving book:", error);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        backgroundColor: "#f8f9fa", // Light background for contrast
      }}
    >
      <div
        className="card shadow p-4  bg-light"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        <BackButton />
         <MdNavigateNext/>
        <h1 className="text-center mb-4" style={{ fontWeight: "bold" }}>
          Create Book
        </h1>
        <form>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Enter book title"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-control"
              placeholder="Enter author name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Publish Year
            </label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="form-control"
              placeholder="Enter publish year"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => navigate('/books/booktable')}
          >
            Save Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBooks;
