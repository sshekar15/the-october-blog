
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../components/AuthContext";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both your username and password.");
      return;
    }

    login(username, password);
    navigate("/posts");
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <p className="post-category">WELCOME BACK</p>

        <h1>Enter If You Dare...</h1>

        <p>Log in to explore the blog and join the conversation.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>

        <p className="login-home-link">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
