import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:4000/signup", { username, password });
      navigate("/books/create");
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className=" card shadow-lg text-info bg-light p-4 m-4" style={{ maxWidth: "400px", width: "100%", margin: "30px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSignUp}>
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
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
