import React from "react";
import { Counter } from "./features/counter/Counter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from "./app/Navbar";
import { PostsList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm"
import { SinglePostPage } from "./features/posts/SinglePostPage";

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
                  <AddPostForm />
                </React.Fragment>
                <Counter />
              </section>
            }
          />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;