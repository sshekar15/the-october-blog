
import { useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "./AuthContext";

function CommentSection() {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Ghostface",
      text: "I like the Scream franchise. The movies always keep you guessing about who the killer is."
    },
    {
      id: 2,
      author: "Michael Myers",
      text: "Halloween is my favorite time of year."
    },
    {
      id: 3,
      author: "Freddy Krueger",
      text: "A Nightmare on Elm Street is a classic. Sweet dreams!"
    },
  ]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      author: user.username,
      text: comment.trim()
    };

    setComments((currentComments) => [
      ...currentComments,
      newComment
    ]);

    setComment("");
  }

  return (
    <section className="comment-section" id="contact">
      <h2>Join the Conversation</h2>

      <p className="comment-intro">
        Share your thoughts about this blog! Or don't. We don't mind.
      </p>

      {user ? (
        <form onSubmit={handleSubmit}>
          <p>Leave a comment as: <strong>{user.username}</strong></p>

          <label htmlFor="comment">Leave your thoughts:</label>

          <textarea
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Hello, who is this? Leave me a comment..."
            rows="3"
            required
          />

          <button type="submit" className="submit-button">
            Submit Comment
          </button>
        </form>
      ) : (
        <p className="login-comment-message">
          No can do! Please <Link to="/login">log in</Link> to join the conversation!
        </p>
      )}

      <h3>Comments ({comments.length})</h3>

      <div className="comments-list">
        {comments.map((item) => (
          <div className="comment" key={item.id}>
            <h4>{item.author}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommentSection;
