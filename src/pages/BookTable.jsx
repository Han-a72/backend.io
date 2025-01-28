import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import BackButton from "../components/BackButton";
import { IoIosLogOut } from "react-icons/io";
const BookTable = () => {
  const [books, setBooks] = useState([]); // State to manage books
  const navigate = useNavigate();

  // Fetch books from API
  useEffect(() => {
    axios
      .get("http://localhost:4000/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleViewDetails = (bookId) => {
    navigate(`/books/details/${bookId}`); // Navigate to book details page
  };

  const handleEditBook = (bookId) => {
    navigate(`/books/edit/${bookId}`); // Navigate to edit book page
  };
 
  
  const handleDeleteBook = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
  
      // Send DELETE request to remove the book
      await axios.delete(`http://localhost:4000/books/${id}`, { headers });
  
      // Optionally refresh or update the UI after deletion
      alert("Book deleted successfully");
      // You can also refresh the page or update the state to reflect the change
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book. Please try again.");
    }
  };
  
  

  return (
    <div className="body p-4"style={{backgroundColor: "#f8f9fa",width:"100vw",height:"100vh"}}>

   
    <div className="container p-4 " >
    <BackButton />
    {/* <IoIosLogOut /> */}
      <h2 className="text-center mb-4 ">Book List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publish Year</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishYear}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        onClick={() => handleViewDetails(book._id)}
                        className="btn btn-sm btn-outline-info"
                      >
                        <CiCircleInfo size={18} />
                      </button>
                      <button
                        onClick={() => handleEditBook(book._id)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        <FaRegEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default BookTable;
