
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

function CommentForm({ onAddComment }) {
  const { user } = useContext(AuthContext);

  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onAddComment({
        name: user.username,
        text: commentText.trim(),
      });

      setCommentText("");
    } catch (error) {
      setError("Sorry, your comment could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="post-comment-form" onSubmit={handleSubmit}>
      <p>Leave a comment as: <strong>{user.username}</strong></p>

      <label htmlFor="comment-text">Your Comment</label>
      <textarea
        id="comment-text"
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
        placeholder="Hello, who is this? Leave me a comment..."
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
