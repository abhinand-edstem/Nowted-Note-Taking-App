import { createAsyncThunk } from '@reduxjs/toolkit';

export const getArchived = createAsyncThunk("user/getArchived", async (reqData, { rejectWithValue }) => {
    try {
        if (!reqData) {
            const localData = localStorage.getItem('archived');

            if (localData) {
                const data = JSON.parse(localData);
                return data;
            }
        } else {
            const data = localStorage.setItem("archived",reqData);
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
