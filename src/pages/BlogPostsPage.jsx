import { useEffect, useState } from "react";
import { Link } from "react-router";

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch blog posts and users
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/users"),
    ])
      .then(([postsResponse, usersResponse]) => {
        if (!postsResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to load blog posts. :(");
        }

        return Promise.all([
          postsResponse.json(),
          usersResponse.json(),
        ]);
      })
      .then(([postsData, usersData]) => {
        // Match each post with its author
        const postsWithAuthors = postsData.map((post) => {
          const author = usersData.find(
            (user) => user.id === post.userId
          );

          return {
            ...post,
            authorName: author ? author.name : "Unknown Author",
          };
        });

        setPosts(postsWithAuthors);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Oops can't fetch posts:", error);
        setError("Sorry, we couldn't load the blog posts. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="blog-posts-page">
        <p className="post-category">THE OCTOBER BLOG</p>
        <h1>All Blog Posts</h1>
        <p>Loading blog posts...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-posts-page">
        <p className="post-category">THE OCTOBER BLOG</p>
        <h1>All Blog Posts</h1>
        <p role="alert">{error}</p>
      </section>
    );
  }

  return (
    <section className="blog-posts-page">
      <p className="post-category">THE OCTOBER BLOG</p>
      <h1>All Blog Posts</h1>
      <p>
        Explore my thoughts on horror movies, parodies, and spooky-season favorites. (Currently blog posts loaded dynamically from the API.)
      </p>

      <div className="posts-list">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <h2>{post.title}</h2>
            <p className="post-details">By {post.authorName}</p>
            <p className="post-excerpt">
              {post.body.length > 120
                ? `${post.body.substring(0, 120)}...`
                : post.body}
            </p>
            <Link to={`/posts/${post.id}`}>Read More →</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BlogPostsPage;