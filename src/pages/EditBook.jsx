import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Use useNavigate hook
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  useEffect(() => {
    // Fetch book details by ID for editing
    const fetchBookForEdit = async () => {
      try { 
        const token=localStorage.getItem("token")
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await axios.get(`http://localhost:4000/books/edit${id}`,{headers});
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book for edit:", error);
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
      await axios.put(`/api/books/${id}`, book);
      navigate(`/books/details/${id}`); // Redirect to details page after update
    } catch (error) {
      console.error("Error updating the book:", error);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Publish Year</label>
          <input
            type="number"
            name="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
