import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const [status, setStatus] = useState("Processing your request...");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      axios
        .get(`https://backend-1-ukwn.onrender.com/api/verify?token=${token}`)
        .then((res) => {
          setStatus(res.data.message);
          // Redirect to login page after successful confirmation
          setTimeout(() => navigate("/signin"), 3000);
        })
        .catch((err) => {
          setStatus(err.response?.data?.message || "Error: Something went wrong.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setStatus("No confirmation token found.");
      setLoading(false);
    }
  }, [searchParams, navigate]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{status}</p>
      )}
    </div>
  );
};

export default ConfirmEmail;
