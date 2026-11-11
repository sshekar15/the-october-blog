
import { useState } from "react";

function BlogPost() {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  return (
    <article className="blog-post" id="home">
      <p className="post-category">
        Thoughts &amp; Interests
      </p>

      <h1>October Is Here: Horror Parodies</h1>

      <div className="post-details">
        <span>By Sheetal Shekar</span>
        <span>October 13, 2026</span>
      </div>

      <div className="post-content">
        <p>
        One of the best parts of the fall is October. Aside from Halloween, Trick-or-Treating,
        and the creative costumes, we have scary movies. Horror movies and shows are a classic
        to watch during the Spooky Season! One of my favorite genres combines classic horror tropes 
        with humor.
    </p>

    <p>
        I like how horror parody movies make fun of typical horror clichés.
        For example, someone might trip while running from a killer or brush
        off a haunting when someone else brings it up. These movies take
        scenes that are supposed to be serious and turn them into something
        funny. The characters' awareness of the clichés and their reactions
        never fail to make me laugh.
    </p>

    <p>
        I also like how these movies make fun of common movie clichés that
        everyone recognizes. Even if you have seen the same thing happen in
        a bunch of movies, it can still be funny when someone makes fun of it.
    </p>
      </div>

    <div className="like-section">
    <button
        className="like-button"
        onClick={() => {
        if (hasLiked) {
            setLikes(likes - 1);
            setHasLiked(false);
        } else {
            setLikes(likes + 1);
            setHasLiked(true);
        }
        }}
    >
        {hasLiked ? "♥ Liked" : "♡ Like"} ({likes})
    </button>
    </div>
    </article>
  );
}

export default BlogPost;
