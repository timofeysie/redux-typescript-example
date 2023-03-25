import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectUserById } from "../users/usersSlice";
import { selectAllPosts } from "../posts/postsSlice";
import { RootState } from "../../app/store";

export const UserPage = () => {
  const params = useParams();
  const userId = params.userId ?? "";

    const user = useSelector((state: RootState) => selectUserById(state, userId));

    const postsForUser = useSelector((state: RootState) => {
        const allPosts = selectAllPosts(state);
        return allPosts.filter((post) => post.user === userId);
    });

    const postTitles = postsForUser.map((post) => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
            <h2>{user?.name}</h2>

            <ul>{postTitles}</ul>
        </section>
    );
};
