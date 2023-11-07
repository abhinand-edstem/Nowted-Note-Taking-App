import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFolder = createAsyncThunk("note/getFolder", async (reqData, { rejectWithValue }) => {
    try {
        if (!reqData) {
            const { data } = await axios.get("http://localhost:8080/v1/folders");
            return data;
        } else {
            let params = {
                name: reqData.name,
            }
            const { data } = await axios.post('http://localhost:8080/v1/folders', params);
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
