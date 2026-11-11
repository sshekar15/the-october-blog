
import { useState } from "react";

function CommentForm({ onAddComment }) {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !commentText.trim()) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onAddComment({
        name: name.trim(),
        text: commentText.trim(),
      });

      setName("");
      setCommentText("");
    } catch (error) {
      setError("Sorry, your comment could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="post-comment-form" onSubmit={handleSubmit}>
      <label htmlFor="commenter-name">Your Name</label>
      <input
        id="commenter-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
        required
      />

      <label htmlFor="comment-text">Your Comment</label>
      <textarea
        id="comment-text"
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
        placeholder="Write your comment..."
        rows="4"
        required
      />

      {error && <p role="alert">{error}</p>}

      <button
        className="submit-button"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
}

export default CommentForm;
