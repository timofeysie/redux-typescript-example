import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Post } from './Post';

const initialState: Post[] = [
  { id: "1", title: "First Post!", content: "Hello!", user: "0" },
  { id: "2", title: "Second Post", content: "More text", user: "1" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(
        state,
        action: PayloadAction<{ id: string; title: string; content: string }>
      ) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;
export default postsSlice.reducer;
