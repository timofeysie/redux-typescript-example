import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";

const API_URL = process.env.REACT_APP_API_URL;

interface Notification {
    id: any;
    read: boolean;
    isNew: boolean;
    user: string;
    date: string;
    message: string;
}

export type AsyncThunkConfig = {
    state: RootState;
    rejectValue: {
        error: Error;
    };
    extra: {
        jwt: string;
    };
};

export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",
    async (_, { getState }) => {
        const allNotifications = (getState() as RootState).notifications;
        const [latestNotification] = allNotifications;
        const latestTimestamp = latestNotification
            ? latestNotification.date
            : "";
        const response = await client.get(
            `${API_URL}/notifications?since=${latestTimestamp}`
        );
        return response.data;
    }
);

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: [] as Notification[],
    reducers: {
        allNotificationsRead(state) {
            state.forEach((notification: Notification) => {
                notification.read = true;
            });
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.push(...action.payload);
            state.forEach((notification) => {
                // Any notifications we've read are no longer new
                notification.isNew = !notification.read;
            });
            // Sort with newest first
            state.sort((a, b) => b.date.localeCompare(a.date));
        });
    },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;
