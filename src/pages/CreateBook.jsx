import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
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

    console.log("Data to be saved:", data); 

    axios
      .post("http://localhost:4000/books", data)
      .then(() => {
        navigate('/');  
      })
      .catch((error) => {
        console.error("Error saving book:", error); 
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="my-4">Create Book</h1>
      <div className="p-4">
        <div className="my-4">
          <label className="mx-4">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mx-5 px-4 py-2"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="my-4">
          <label className="mx-4">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mx-5 px-4 py-2"
          />
        </div>
        <div className="p-4">
          <div className="my-4">
            <label className="mx-4">Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="mx-5 px-4 py-2"
            />
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleSaveBook}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
