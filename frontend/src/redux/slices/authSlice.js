import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, password, role }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/register`, { username, password, role });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { username, password });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: token || null,
        role: role || null,
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.role = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
        clearMessages(state) {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.role = action.payload.role;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('role', action.payload.role);
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
