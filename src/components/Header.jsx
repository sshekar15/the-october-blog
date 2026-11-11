
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import logo from "../assets/logoBlog.png";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [postsOpen, setPostsOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load posts.");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 3));
      })
      .catch((error) => {
        console.error("Error fetching header posts:", error);
      });
  }, []);

  return (
    <header className="site-header">
      <Link className="logo" to="/">
        <img src={logo} alt="October Blog logo" />
        <span>The October Blog</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>

        <div className="blog-dropdown">
          <button
            type="button"
            className="blog-dropdown-toggle"
            onClick={() => setPostsOpen(!postsOpen)}
            aria-expanded={postsOpen}
          >
            Blog Posts ▾
          </button>

          {postsOpen && (
            <div className="blog-dropdown-menu">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  onClick={() => setPostsOpen(false)}
                >
                  {post.title}
                </Link>
              ))}

              <Link to="/posts" onClick={() => setPostsOpen(false)}>
                View All Posts
              </Link>
            </div>
          )}
        </div>

        <Link to="/contact">Contact</Link>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {theme === "light" ? "⏾⋆. Dark Mode" : "⋆☀︎. Light Mode"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
