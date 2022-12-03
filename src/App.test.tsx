import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("renders learn react link", () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(container).toHaveTextContent("Redux");
});

test("full app rendering/navigating", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const user = userEvent.setup();
  expect(screen.getByText(/posts/i)).toBeInTheDocument();
  await user.click(screen.getAllByText(/View Post/i)[0]);
  expect(screen.getByText(/First Post!/i)).toBeInTheDocument();
});