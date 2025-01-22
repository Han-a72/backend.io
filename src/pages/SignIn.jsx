import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/signin", { username, password });
      const token = response.data.token;

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Navigate to home page or another route
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Sign in failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <BackButton />
      <div className="p-4 m-5" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
