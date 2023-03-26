import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";

interface Notification {
    id: any;
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
            `/fakeApi/notifications?since=${latestTimestamp}`
        );
        return response.data;
    }
);

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: [] as Notification[],
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.push(...action.payload);
            // Sort with newest first
            state.sort((a, b) => b.date.localeCompare(a.date));
        });
    },
});

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;
