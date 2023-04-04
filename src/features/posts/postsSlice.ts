import {
    createSlice,
    nanoid,
    PayloadAction,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "./Post";
import { RootState } from "../../app/store";
import { Draft } from "immer";
import produce from 'immer';

const API_URL = process.env.REACT_APP_API_URL;

const postsAdapter = createEntityAdapter<Post>({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
    status: "idle",
    error: null,
});

export const fetchPosts: any = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        const response = await axios.get(API_URL + "/posts");
        return response.data;
    }
);

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    // The payload creator receives the partial `{title, content, user}` object
    async (initialPost: any) => {
        // We send the initial data to the fake API server
        const response = await axios.post(API_URL + "/posts", initialPost);
        // The response includes the complete post object, including unique ID
        return response.data;
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;

            const existingPost = state.entities[postId];
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
        postAdded: {
            reducer(state, action: PayloadAction<Post>) {
                return produce(state, (draftState: { posts: Post[] }) => {
                  draftState.posts.push(action.payload);
                });
              },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0,
                        },
                    },
                };
            },
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.entities[id];
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Add any fetched posts to the array
                // Use the `upsertMany` reducer as a mutating update utility
                postsAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // Use the `addOne` reducer for the fulfilled case
            .addCase(addNewPost.fulfilled, postsAdapter.addOne);
    },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
  } = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter((post) => post.user === userId)
);
