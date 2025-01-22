import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details by ID
    const fetchBookDetails = async () => {
      try {
        const token=localStorage.getItem("token")
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await axios.get(`http://localhost:4000/books/${id}`,{headers});
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>Book Details</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publish Year:</strong> {book.publishYear}</p>
    </div>
  );
};

export default BookDetails;
