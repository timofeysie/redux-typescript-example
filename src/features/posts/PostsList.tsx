import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { Post } from "./Post";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";

export const PostsList = () => {
    const posts = useAppSelector((state) => state.posts);
    const orderedPosts = posts
        .slice()
        .sort((a: Post, b: Post) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post: Post) => {
        return (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>
                <div>
                    <PostAuthor userId={post.user} />
                    <TimeAgo timestamp={post.date} />
                </div>
                <p className="post-content">{post.content.substring(0, 100)}</p>
                <ReactionButtons post={post} />
                <Link to={`/posts/${post.id}`} className="button muted-button">
                    View Post
                </Link>
            </article>
        );
    });

    return (
        <section className="posts-list">
            <h2 data-testid="post-list-title">Posts</h2>
            <>{renderedPosts}</>
        </section>
    );
};
