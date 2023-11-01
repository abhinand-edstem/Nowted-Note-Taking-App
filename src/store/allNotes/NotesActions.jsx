import { createAsyncThunk } from '@reduxjs/toolkit';

export const getNotes = createAsyncThunk("user/getNotes", async (reqData, { rejectWithValue }) => {
    try {
        if (!reqData) {
            const localData = localStorage.getItem('Notes');

            if (localData) {
                const data = JSON.parse(localData);
                return data;
            }
        } else {
            const data = localStorage.setItem("Notes", JSON.stringify(reqData));

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
