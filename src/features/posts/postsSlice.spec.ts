import postsReducer from "./postsSlice";
import { postAdded, postUpdated, reactionAdded } from "./postsSlice";
import { sub } from "date-fns";

describe("posts reducer", () => {
  const dateSub10 = sub(new Date(), { minutes: 10 }).toISOString();
  const initialState = [
      {
          id: "1",
          title: "First Post!",
          content: "Hello!",
          user: "0",
          date: dateSub10,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
      {
          id: "2",
          title: "Second Post",
          content: "More text",
          user: "1",
          date: dateSub10,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
  ];
  const expectedPostAddedState = [
      {
          id: "1",
          title: "First Post!",
          content: "Hello!",
          user: "0",
          date: dateSub10,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
      {
          id: "2",
          title: "Second Post",
          content: "More text",
          user: "1",
          date: dateSub10,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
      {
          id: "3",
          title: "test-title",
          content: "test-content",
          user: "2",
          date: dateSub10,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
  ];
  const postUpdatedState = [
      {
          id: "1",
          title: "First Post!",
          content: "Hello!",
          user: "0",
          date: dateSub10,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
      {
          id: "2",
          title: "Second Post",
          content: "More text",
          user: "1",
          date: dateSub10,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
      {
          id: "3",
          title: "test-title-edit",
          content: "test-content-edit",
          user: "2",
          date: dateSub10,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
  ];
  it("should handle initial state", () => {
    expect(postsReducer(undefined, { type: "unknown" })).toHaveLength(initialState.length);
  });

  it("should handle increment", () => {
    const actualState = postsReducer(
      initialState,
      postAdded("test-title", "test-content", 0)
    );
    expect(actualState.length).toEqual(initialState.length + 1);
    const actualText = actualState[initialState.length].title;
    const expectedText = "test-title";
    expect(actualText).toEqual(expectedText);
  });
  it("edit a post", () => {
    const actual = postsReducer(
      expectedPostAddedState,
      postUpdated({
        id: "3",
        title: "test-title-edit",
        content: "test-content-edit",
      })
    );
    expect(actual).toEqual(postUpdatedState);
  });
  it("increments a reaction", () => {
      const actual = postsReducer(
          initialState,
          reactionAdded({ postId: 0, reaction: "thumbsUp" })
      );
      expect(actual).toEqual(postUpdatedState);
  });
});
