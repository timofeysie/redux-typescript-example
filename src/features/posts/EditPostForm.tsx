import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postUpdated, selectPostById } from "./postsSlice";
import { useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";

export const EditPostForm = () => {
  const params = useParams();
  const postId = params.postId ?? "";

  const post = useAppSelector((state: RootState) =>
      selectPostById(state, postId)
  );

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setTitle((e.target as HTMLInputElement).value);
  const onContentChanged = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setContent((e.target as HTMLInputElement).value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section className="posts-list">
      <h2>Edit Post</h2>
      <form className="post-excerpt form-container">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          className="form-input"
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          className="form-input"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button
        type="button"
        className="button muted-button"
        onClick={onSavePostClicked}
      >
        Save Post
      </button>
    </section>
  );
};
