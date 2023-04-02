import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotifications,
    selectAllNotifications,
} from "../features/notifications/notificationsSlice";

export const Navbar = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectAllNotifications);
    const numUnreadNotifications = notifications.filter((n) => !n.read).length;

    const fetchNewNotifications = () => {
        dispatch(fetchNotifications() as any);
    };

    let unreadNotificationsBadge;

    if (numUnreadNotifications > 0) {
        unreadNotificationsBadge = (
            <span className="badge">{numUnreadNotifications}</span>
        );
    }

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
                      <Link to="/notifications">
                          Notifications {unreadNotificationsBadge}
                      </Link>
                  </div>
                  <button className="button" onClick={fetchNewNotifications}>
                      Refresh Notifications
                  </button>
              </div>
          </section>
      </nav>
  );
};
