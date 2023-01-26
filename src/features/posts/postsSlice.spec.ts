import postsReducer from "./postsSlice";
import { postAdded, postUpdated } from "./postsSlice";

describe("posts reducer", () => {
  const initialState = [
    { id: "1", title: "First Post!", content: "Hello!", user: "0" },
    { id: "2", title: "Second Post", content: "More text", user: "1" },
  ];
  const expectedPostAddedState = [
    { id: "1", title: "First Post!", content: "Hello!", user: "0" },
    { id: "2", title: "Second Post", content: "More text", user: "1" },
    { id: "3", title: "test-title", content: "test-content", user: "2" },
  ];
  const postUpdatedState = [
    { id: "1", title: "First Post!", content: "Hello!", user: "0" },
    { id: "2", title: "Second Post", content: "More text", user: "1" },
    {
      id: "3",
      title: "test-title-edit",
      content: "test-content-edit",
      user: "2",
    },
  ];
  it("should handle initial state", () => {
    expect(postsReducer(undefined, { type: "unknown" })).toEqual(initialState);
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
});
