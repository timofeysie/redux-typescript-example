import { RootState, AppThunk } from "../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";

const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

export interface AuthState {
    loading: boolean;
    userInfo: any;
    userToken: any;
    error: any;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken"); // delete token from storage
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
        },
        setCredentials: (state, { payload }) => {
            state.userInfo = payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true; // registration successful
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export default authSlice.reducer;
