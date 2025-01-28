import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeleteBook = () => {
  const { id } = useParams(); // Extract the book ID from the URL
  const navigate = useNavigate(); // Used for navigation
  const [book, setBook] = useState(null); // State for storing book details
  const [isLoading, setIsLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error handling

  // Fetch book details for deletion
  useEffect(() => {
    const fetchBookForDelete = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token retrieved:", token); // Check if the token is fetched correctly
        if (!token) throw new Error("User is not authenticated.");
  
        const headers = { Authorization: `Bearer ${token}` };
        console.log("Fetching book with ID:", id); // Confirm the book ID being fetched
        const response = await axios.get(`http://localhost:4000/books/${id}`, { headers });
        console.log("Book fetched successfully:", response.data); // Log the fetched book details
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching book for delete:", err);
        setError("Error fetching book details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBookForDelete();
  }, [id]);
  

  // Handle book deletion
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token retrieved for deletion:", token); // Verify token before deletion
      if (!token) throw new Error("User is not authenticated.");
  
      const headers = { Authorization: `Bearer ${token}` };
      console.log("Sending DELETE request for book with ID:", id); // Confirm the book ID being deleted
      await axios.delete(`http://localhost:4000/books/${id}`, { headers });
      console.log("Book deleted successfully"); // Log success message
      alert("Book successfully deleted!");
      navigate("/books");
    } catch (err) {
      console.error("Error deleting the book:", err); // Log any errors
      alert("Failed to delete the book. Please try again.");
    }
  };
  

  // Render loading state
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Render error message
  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="card-body text-center">
          <h2 className="card-title text-danger mb-4">Delete Book</h2>
          <p className="fs-5 mb-3">Are you sure you want to delete this book?</p>
          <div className="text-start">
            <p>
              <strong>Title:</strong> {book.title}
            </p>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Publish Year:</strong> {book.publishYear}
            </p>
          </div>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(`/books/details/${id}`)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
