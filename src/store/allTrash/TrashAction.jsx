import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTrash = createAsyncThunk("user/getTrash", async (reqData, { rejectWithValue }) => {
    try {
        if (!reqData) {
            const localData = localStorage.getItem('trashItems');

            if (localData) {
                const data = JSON.parse(localData);
                return data;
            }
        } else {
            const data = localStorage.setItem("trashItems",reqData);
            return data;
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
