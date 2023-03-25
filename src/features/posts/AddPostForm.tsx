import React, { useState } from "react";
import type { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { AppDispatch } from "../../app/store"

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setTitle((e.target as HTMLInputElement).value);
  const onContentChanged = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setContent((e.target as HTMLInputElement).value);
  const onAuthorChanged = (e: React.FormEvent<HTMLSelectElement>) =>
    setUserId((e.target as HTMLInputElement).value);

  const canSave =
      [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async () => {
      if (canSave) {
          try {
              setAddRequestStatus("pending");
              await dispatch(
                  addNewPost({ title, content, user: userId })
              ).unwrap();
              setTitle("");
              setContent("");
              setUserId("");
          } catch (err) {
              console.error("Failed to create project: ", err);
          } finally {
              setAddRequestStatus("idle");
          }
      }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  
  return (
      <section className="add-new-post">
          <h2>Add a New Post</h2>
          <form className="post-excerpt form-container">
              <label htmlFor="postTitle">Post Title:</label>
              <input
                  type="text"
                  id="postTitle"
                  name="postTitle"
                  value={title}
                  onChange={onTitleChanged}
                  className="form-input"
              />
              <label htmlFor="postAuthor">Author:</label>
              <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                  <option value=""></option>
                  {usersOptions}
              </select>
              <label htmlFor="postContent">Content:</label>
              <textarea
                  id="postContent"
                  name="postContent"
                  value={content}
                  onChange={onContentChanged}
                  className="form-input"
              />
              <button
                  type="button"
                  onClick={onSavePostClicked}
                  disabled={!canSave}
                  className="button muted-button"
              >
                  Save Post
              </button>
          </form>
      </section>
  );
};
