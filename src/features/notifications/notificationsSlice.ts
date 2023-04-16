import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
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

const notificationsAdapter = createEntityAdapter<Notification>({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
  })

export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",
    async (_, { getState }) => {
        const allNotifications: any = (getState() as RootState).notifications;
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
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state) {
            Object.values(state.entities).forEach(notification => {
                if (notification) {
                    notification.read = true
                }
            })
          }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
          notificationsAdapter.upsertMany(state, action.payload)
          Object.values(state.entities).forEach(notification => {
            // Any notifications we've read are no longer new
            if (notification) {
                notification.isNew = !notification.read
            }
          })
        })
      }
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;
