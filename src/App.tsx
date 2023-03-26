import React from "react";
import { Counter } from "./features/counter/Counter";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./app/Navbar";
import { PostsList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm"
import { UsersList } from "./features/users/UsersList"
import { UserPage } from "./features/users/UserPage"
import { NotificationsList } from "./features/notifications/NotificationsList"

function App() {
  return (
      <>
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
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/:userId" element={<UserPage />} />
                  <Route path="/notifications" element={<NotificationsList />} />
              </Routes>
          </div>
      </>
  );
}

export default App;
