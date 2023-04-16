import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectUserById } from "../users/usersSlice";
import { selectPostsByUser, selectAllPosts } from "../posts/postsSlice";
import { RootState } from "../../app/store";
import { User } from "../users/User";

export const UserPage = () => {
  const params = useParams();
  const userId = params.userId ?? "";

    const user: User | unknown = useSelector((state: RootState) => selectUserById(state, userId)) || null;

    const postsForUser = useSelector((state: RootState) =>
        selectPostsByUser(state, userId)
    );

    const postTitles = postsForUser.map((post) => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
            <h2>{(user as User).name}</h2>

            <ul>{postTitles}</ul>
        </section>
    );
};
