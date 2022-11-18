import postsReducer from "./postsSlice";
import { postAdded } from "./postsSlice";

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
  it("should handle initial state", () => {
    expect(postsReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle increment", () => {
    const actualState = postsReducer(
      initialState,
      postAdded({
        id: "3",
        title: "test-title",
        content: "test-content",
      })
    );
    expect(actualState).toEqual(expectedPostAddedState);
  });

});
