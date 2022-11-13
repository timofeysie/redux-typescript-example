import React from "react";
import { Counter } from "./features/counter/Counter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Navbar } from "./app/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h2>Welcome to the Redux Essentials example app!</h2>
                <Counter />
              </section>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;