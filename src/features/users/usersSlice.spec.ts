import usersReducer from "./usersSlice";
describe("users reducer", () => {
  const initialState = [
    { id: "0", name: "Tianna Jenkins" },
    { id: "1", name: "Kevin Grant" },
    { id: "2", name: "Madison Price" },
  ];
  it("should handle initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
});
