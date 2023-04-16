import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { User } from './User';
import { RootState } from "../../app/store";

const API_URL = process.env.REACT_APP_API_URL;

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await client.get(API_URL + "/users");
    return response.data;
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
      }
});

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users)
