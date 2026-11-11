import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";

import Header from "./components/Header";
import BlogPost from "./components/BlogPost";
import About from "./components/About";
import CommentSection from "./components/CommentSection";
import Footer from "./components/Footer";

import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";

import "./App.css";

function HomePage() {
  return (
    <>
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
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
