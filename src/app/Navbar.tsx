import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchNotifications } from "../features/notifications/notificationsSlice";

export const Navbar = () => {
    const dispatch = useDispatch();

    const fetchNewNotifications = () => {
        dispatch(fetchNotifications() as any);
    };

  return (
      <nav>
          <section>
              <h1>Redux Essentials Example</h1>

              <div className="navContent">
                  <div className="navLinks">
                      <Link to="/" data-testid="nav-post-link">
                          Posts
                      </Link>
                      <Link to="/users">Users</Link>
                      <Link to="/notifications">Notifications</Link>
                  </div>
                  <button className="button" onClick={fetchNewNotifications}>
                      Refresh Notifications
                  </button>
              </div>
          </section>
      </nav>
  );
};
