import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import { selectAllUsers } from "../users/usersSlice";
import {
    selectAllNotifications,
    allNotificationsRead,
} from "./notificationsSlice";
import classnames from "classnames";
import { User } from "../users/User";

export const NotificationsList = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectAllNotifications);
    const users = useSelector(selectAllUsers);

    useLayoutEffect(() => {
        dispatch(allNotificationsRead());
    });

    const notificationIds = Object.keys(notifications.entities);

    const renderedNotifications = notificationIds.map((notificationId) => {
        const notification = notifications.entities[notificationId];
        if (!notification) {
            // handle case where notification is undefined
            return null; // or any default value or appropriate handling
        }

        const date = notification?.date ? parseISO(notification.date) : null;
        const timeAgo = date ? formatDistanceToNow(date) : null;

        const defaultUser: User = {
            id: null,
            name: "Unknown User",
        };

        const user = users.find(
            (user): user is User => (user as User).id === notification.user
        );

        const notificationClassname = classnames("notification", {
            new: notification.isNew,
        });

        if (user) {
            return (
                <div key={notification.id} className={notificationClassname}>
                    <div>
                        <b>{user.name}</b> {notification.message}
                    </div>
                    <div title={notification.date}>
                        <i>{timeAgo} ago</i>
                    </div>
                </div>
            );
        }
    });

    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            {renderedNotifications}
        </section>
    );
};
