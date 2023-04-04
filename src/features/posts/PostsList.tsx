import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { Post } from "./Post";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import {
    selectAllPosts,
    fetchPosts,
    selectPostIds,
    selectPostById,
} from "./postsSlice";
import type { RootState } from "../../app/store";
import { Spinner } from "../../components/Spinner";

interface Props {
    postId: any;
}

const PostExcerpt = ({ postId }: Props) => {
    const post = useSelector((state: RootState) =>
        selectPostById(state, postId)
    );
    return (
        <article className="post-excerpt">
            <h3>{post?.title}</h3>
            <div>
                <PostAuthor userId={post?.user} />
                <TimeAgo timestamp={post?.date} />
            </div>
            <p className="post-content">{post?.content.substring(0, 100)}</p>

            {post && <ReactionButtons post={post} />}
            <Link to={`/posts/${post?.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    );
};

export const PostsList = () => {
    const dispatch = useDispatch();
    const orderedPostIds = useSelector(selectPostIds);
    const posts = useSelector(selectAllPosts);

    const postStatus = useSelector((state: RootState) => state.posts.status);
    const error = useSelector((state: RootState) => state.posts.error);

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    let content;

    if (postStatus === "loading") {
        content = <Spinner text="Loading..." />;
    } else if (postStatus === "succeeded") {
        content = orderedPostIds.map((postId) => (
            <PostExcerpt key={postId} postId={postId} />
        ));
    } else if (postStatus === "failed") {
        content = <div>{error}</div>;
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    );
};
