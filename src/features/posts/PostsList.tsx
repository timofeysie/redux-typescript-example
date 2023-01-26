import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { Post } from "./Post";
import { PostAuthor } from "./PostAuthor"

export const PostsList = () => {
  const posts = useAppSelector((state) => state.posts);
  const renderedPosts = posts.map((post: Post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3> <PostAuthor userId={post.user} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2 data-testid="post-list-title">Posts</h2>
      {renderedPosts}
    </section>
  );
};
