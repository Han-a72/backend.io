import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookForEdit = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`http://localhost:4000/books/${id}`, { headers });
        setBook(response.data);
      } catch (err) {
        setError("Error fetching book details. Please try again later.");
        console.error("Error fetching book for edit:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookForEdit();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`http://localhost:4000/books/${id}`, book, { headers });
      navigate(`/books/details/${id}`, { state: { book } });
    } catch (err) {
      console.error("Error updating the book:", err);
      alert("Failed to update the book. Please try again.");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-5">Loading book details...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg text-info bg-light" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="card-body">
          <BackButton  />
          <h2 className="text-center text-primary mb-4">Edit Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={book.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={book.author}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publishYear" className="form-label">
                Publish Year
              </label>
              <input
                type="number"
                id="publishYear"
                name="publishYear"
                value={book.publishYear}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Update Book
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(`/books/details/${id}`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
