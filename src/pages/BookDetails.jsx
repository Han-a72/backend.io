import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`http://localhost:4000/books/${id}`, { headers });
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow-lg text-info bg-light" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="card-body">
          <BackButton />
          <h2 className="card-title text-center mb-4">Book Details</h2>
          <div className="mb-3">
            <strong className="text-muted">Title:</strong>
            <p className="fs-5 mb-1">{book.title}</p>
          </div>
          <div className="mb-3">
            <strong className="text-muted">Author:</strong>
            <p className="fs-5 mb-1">{book.author}</p>
          </div>
          <div className="mb-3">
            <strong className="text-muted">Publish Year:</strong>
            <p className="fs-5 mb-1">{book.publishYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
