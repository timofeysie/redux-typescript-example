import React from "react";
import { Counter } from "./features/counter/Counter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from "./app/Navbar";
import { PostsList } from "./features/posts/PostsList";

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
                <React.Fragment>
                  <PostsList />
                </React.Fragment>
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