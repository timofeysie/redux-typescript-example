import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom"

test("renders a title with Redux in it", () => {
const { container } = render(
  <Provider store={store}>
    <App />
  </Provider>,
  { wrapper: BrowserRouter }
);
  expect(container).toHaveTextContent("Redux");
});

test("navigates to the first post and back again", async () => {
render(
  <Provider store={store}>
    <App />
  </Provider>,
  { wrapper: BrowserRouter }
);
  const user = userEvent.setup();
  expect(screen.getByTestId("post-list-title")).toBeInTheDocument();
  await user.click(screen.getAllByText(/View Post/i)[0]);
  expect(screen.getByText(/First Post!/i)).toBeInTheDocument();
  expect(screen.getByTestId("location-display")).toBeInTheDocument();
  await user.click(screen.getByTestId("nav-post-link"));
  expect(screen.getByTestId("post-list-title")).toBeInTheDocument();
});

test("landing on a bad page", () => {
  const badRoute = "/posts/100";
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
  expect(screen.getByText(/Post not found!/i)).toBeInTheDocument();
});

test("reaction buttons increment reaction", async () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    const thumbsUp = await screen.findAllByText("👍");
    await user.click(thumbsUp[0]);
    expect(screen.getByText(/👍/i)).toBeInTheDocument();
});