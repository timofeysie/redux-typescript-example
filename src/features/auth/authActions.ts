import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

interface LoginPayload {
    email: string;
    password: string;
}

interface RegistrationData {
    firstName: string;
    email: string;
    password: string;
}

interface CustomError {
    message: string;
}

export const userLogin = createAsyncThunk<
    any,
    LoginPayload,
    { rejectValue: CustomError }
>("user/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `${API_URL}/api/user/login`,
            { email, password },
            config
        );

        localStorage.setItem("userToken", data.userToken);

        return data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data) as ReturnType<
                typeof rejectWithValue
            >;
        } else {
            return rejectWithValue({ message: error.message }) as ReturnType<
                typeof rejectWithValue
            >;
        }
    }
});

export const registerUser = createAsyncThunk<
    void,
    RegistrationData,
    { rejectValue: CustomError }
>("user/register", async (registrationData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios.post(
            `${API_URL}/api/user/register`,
            registrationData,
            config
        );
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data) as ReturnType<
                typeof rejectWithValue
            >;
        } else {
            return rejectWithValue({ message: error.message }) as ReturnType<
                typeof rejectWithValue
            >;
        }
    }
});
