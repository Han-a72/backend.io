import { useNavigate } from "react-router-dom";

import BackButton from "../components/BackButton";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      
        localStorage.removeItem("token");

        navigate("/signin");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 ">
            

            <div className=" card shadow-lg text-info bg-light p-4 m-4 mt-4 mb-4" style={{ maxWidth: "400px", width: "700px",height:"400px" }}>
            <BackButton />
                <h2 className="text-center mb-4">Logout</h2>
                <p className="text-center">Are you sure you want to log out?</p>
                <button
                    className="btn btn-danger w-100 mb-2"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <button
                    className="btn btn-secondary w-100"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Logout;
