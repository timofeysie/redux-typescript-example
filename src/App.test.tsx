import React from 'react';
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders learn react link', () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(container).toHaveTextContent("Redux");
});
