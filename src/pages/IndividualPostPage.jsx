
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import CommentForm from "../components/CommentForm";

function IndividualPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPostData() {
      setLoading(true);
      setError("");

      try {
        // Fetch the selected blog post
        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!postResponse.ok) {
          throw new Error("We could not find this blog post.");
        }

        const postData = await postResponse.json();
        setPost(postData);

        // Fetch the author's information and the post's comments
        const [userResponse, commentsResponse] = await Promise.all([
          fetch(
            `https://jsonplaceholder.typicode.com/users/${postData.userId}`
          ),
          fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`
          ),
        ]);

        if (!userResponse.ok || !commentsResponse.ok) {
          throw new Error("Could not load the author or comments.");
        }

        const userData = await userResponse.json();
        const commentsData = await commentsResponse.json();

        setUser(userData);

        setComments(
          commentsData.map((comment) => ({
            id: comment.id,
            name: comment.name,
            email: comment.email,
            text: comment.body,
          }))
        );
      } catch (error) {
        console.error("Error fetching post data:", error);
        setError("Sorry, we couldn't load this blog post. Please try again soon!");
      } finally {
        setLoading(false);
      }
    }

    fetchPostData();
  }, [id]);

  // Submit a new comment to the API
  async function handleAddComment(newComment) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: Number(id),
            name: newComment.name,
            body: newComment.text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment.");
      }

      const savedComment = await response.json();

      // Add the new comment to the page
      setComments((currentComments) => [
        ...currentComments,
        {
          id: savedComment.id,
          name: savedComment.name,
          text: savedComment.body,
        },
      ]);
    } catch (error) {
      console.error("Error submitting comment:", error);
      throw error;
    }
  }

  if (loading) {
    return (
      <section className="blog-post">
        <p>Loading blog post...</p>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="blog-post">
        <h1>Post Is Ghosting You!</h1>
        <p role="alert">{error || "This blog post does not exist."}</p>
        <Link to="/posts">Back to All Posts</Link>
      </section>
    );
  }

  return (
    <>
      <article className="blog-post individual-post">
        <p className="post-category">THOUGHTS &amp; INTERESTS</p>

        <h1>{post.title}</h1>

        <div className="post-details">
          <span>By {user ? user.name : "Unknown Author"}</span>
          {user && <span>{user.email}</span>}
        </div>

        <div className="post-content">
          <p>{post.body}</p>
        </div>

        <p>
          <Link to="/posts">← Back to All Posts</Link>
        </p>
      </article>

      <section className="post-comments">
        <h2>Comments</h2>

        <p className="comments-description">
          Share your thoughts about this post!
        </p>

        <CommentForm onAddComment={handleAddComment} />

        <div className="post-comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((item) => (
              <article className="post-comment" key={item.id}>
                <h3>{item.name}</h3>
                {item.email && <p>{item.email}</p>}
                <p>{item.text}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default IndividualPostPage;
