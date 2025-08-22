import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showAlert } from './alertSlice';

const API = `${import.meta.env.VITE_API_URL}/api/products`;

export const fetchMerchantProducts = createAsyncThunk(
    'products/fetchMerchantProducts',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.get(`${API}/merchant`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (data, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.post(API, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data.product;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Add product failed');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, data }, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.put(`${API}/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data.product;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Update failed');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { getState, rejectWithValue, dispatch }) => {
        try {
            const { token } = getState().auth;
            await axios.delete(`${API}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(showAlert({ message: 'Product deleted successfully', severity: 'success' }));
            return id;
        } catch (err) {
            dispatch(showAlert({ message: err.response?.data?.message || 'Delete failed', severity: 'error' }));
            return rejectWithValue(err.response?.data?.message || 'Delete failed');
        }
    }
);

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async (queryParams = {}, { getState, rejectWithValue }) => {  // getState added here
        try {
            const token = getState().auth.token; // get token from state
            const params = new URLSearchParams();

            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== '') params.append(key, value);
            });

            const res = await axios.get(`${API}?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
        }
    }
);


const productSlice = createSlice({
    name: 'products',
    initialState: {
        merchantProducts: [],
        allProducts: {
            products: [],
            total: 0,
            page: 1,
            pages: 1,
        },
        loading: false,
        error: null,
    },

    reducers: {
        clearProductError: (state) => {
            state.error = null;
        }
    },

    extraReducers: builder => {
        builder
            .addCase(fetchMerchantProducts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchMerchantProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.merchantProducts = action.payload;
            })
            .addCase(fetchMerchantProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addProduct.fulfilled, (state, action) => {
                state.merchantProducts.push(action.payload);
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.merchantProducts.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.merchantProducts[index] = action.payload;
                }
            })

            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.allProducts = {
                    products: action.payload.products,
                    total: action.payload.total,
                    page: action.payload.page,
                    pages: action.payload.pages,
                };
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.merchantProducts = state.merchantProducts.filter(p => p._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
