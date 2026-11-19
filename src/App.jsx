
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";
import { AuthProvider, AuthContext } from "./components/AuthContext";

import Header from "./components/Header";
import BlogPost from "./components/BlogPost";
import About from "./components/About";
import CommentSection from "./components/CommentSection";
import Footer from "./components/Footer";

import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <section className="landing-page">
        <div className="landing-content">
          <p className="post-category">WELCOME TO THE OCTOBER BLOG</p>

          <h1>Enter If You Dare...</h1>

          <p>
            A place for thoughts, interests, horror movies, and everything
            in between. Explore the blog, share your opinions, and join
            the conversation!
          </p>

          <div className="landing-buttons">
            {!user && (
              <Link to="/login" className="landing-button">
                Login
              </Link>
            )}

            <Link to="/posts" className="landing-button">
              Explore Blog
            </Link>
          </div>
        </div>
      </section>

      <BlogPost />
      <About />
      <CommentSection />
    </>
  );
}

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <div className={`app ${theme}-theme`}>
        <Header />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts" element={<BlogPostsPage />} />
            <Route path="/posts/:id" element={<IndividualPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
