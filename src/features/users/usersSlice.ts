import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { User } from './User';

const API_URL = process.env.REACT_APP_API_URL;

const initialState: User [] = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await client.get(API_URL + "/users");
    return response.data;
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default usersSlice.reducer;
