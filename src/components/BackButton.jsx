import { useNavigate } from "react-router-dom";  // This import is correct
import { IoIosArrowBack } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";  // Add this import
import { MdNavigateNext } from "react-icons/md";
const BackButton = () => {
  const navigate = useNavigate(); // Access the navigate function

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <div>
      <button onClick={handleBackClick} className="btn btn-secondary">
        <IoIosArrowBack className="display-5" />
      </button>
      <Link to="/logout" className="btn btn-secondary m-3">
        <IoIosLogOut className="display-5" />
      </Link>
      <button onClick={handleBackClick} className="btn btn-secondary">
        < MdNavigateNext className="display-5" />
      </button>
      
    </div>
  );
};

export default BackButton;
