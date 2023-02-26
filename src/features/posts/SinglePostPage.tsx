import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { PostAuthor } from "./PostAuthor";
import { Post } from "./Post";
import { ReactionButtons } from "./ReactionButtons";

export const SinglePostPage = () => {
   const params = useParams();
   const postId = params.postId;

  const post = useAppSelector((state) =>
    state.posts.find((post: Post) => post.id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
      <section data-testid="location-display">
          <article className="post">
              <h2>{post.title}</h2>
              <p className="post-content">{post.content}</p>
              <ReactionButtons post={post} />
              <PostAuthor userId={post.user} />
              <Link to={`/editPost/${post.id}`} className="button">
                  Edit Post
              </Link>
          </article>
      </section>
  );
};
