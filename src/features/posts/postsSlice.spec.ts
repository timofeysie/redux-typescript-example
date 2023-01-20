import postsReducer from "./postsSlice";
import { postAdded, postUpdated } from "./postsSlice";

describe("counter reducer", () => {
  const initialState = [
    { id: "1", title: "First Post!", content: "Hello!" },
    { id: "2", title: "Second Post", content: "More text" },
  ];
  const expectedPostAddedState = [
    { id: "1", title: "First Post!", content: "Hello!" },
    { id: "2", title: "Second Post", content: "More text" },
    { id: "3", title: "test-title", content: "test-content" },
  ];
  const postUpdatedState = [
    { id: "1", title: "First Post!", content: "Hello!" },
    { id: "2", title: "Second Post", content: "More text" },
    { id: "3", title: "test-title-edit", content: "test-content-edit" },
  ];
  it("should handle initial state", () => {
    expect(postsReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle increment", () => {
    const actualState = postsReducer(
      initialState,
      postAdded("test-title", "test-content")
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
