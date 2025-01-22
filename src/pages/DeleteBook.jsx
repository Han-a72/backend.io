import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeleteBook = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details by ID to confirm the book before deleting
    const fetchBookForDelete = async () => {
      try {
        const token=localStorage.getItem("token")
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await axios.get(`http://localhost:4000/books/delete${id}`,{headers});
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book for delete:", error);
      }
    };

    fetchBookForDelete();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/books/${id}`);
      history.push("/books"); // Redirect to the books list after deletion
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>Are you sure you want to delete this book?</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publish Year:</strong> {book.publishYear}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => history.push(`/books/details/${id}`)}>Cancel</button>
    </div>
  );
};

export default DeleteBook;
