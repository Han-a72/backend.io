import "bootstrap/dist/css/bootstrap.css";
import { CiSquarePlus,CiLogin } from "react-icons/ci";
import { GoSignIn } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from "axios";
import BookTable from "../components/home/BookTable";
import { useEffect, useState } from "react";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);


    const token=localStorage.getItem("token")
    console.log("token",token)
    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await axios.get("http://localhost:4000/books", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setBooks(response.data);
          } catch (error) {
            setError("Failed to fetch books");
            console.error();
          }
        };
        fetchBooks();
      }, [token]);
      

    return (
        <div className="container p-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="lead display-4 mt-5">Book List</h1>
                <Link to="/books/create">
                    <CiSquarePlus className="display-5 m-4" />
                </Link>
                <Link to="/login">
                    <CiLogin className="display-5 m-4" />
                </Link>
                <Link to="/Signin">
              <  GoSignIn className="display-4 m-4 "  />
                </Link>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <BookTable books={books} />
        </div>
    );
};

export default Home;
