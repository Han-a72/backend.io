import { Link } from "react-router-dom";  
import { IoIosArrowBack } from "react-icons/io";  

const BackButton = () => {
  return (
    <div>
      
      <Link to="/" className="btn btn-secondary">
        <IoIosArrowBack className="display-5" /> 
      </Link>
    </div>
  );
};

export default BackButton;
