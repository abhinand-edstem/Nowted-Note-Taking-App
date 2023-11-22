import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFolder = createAsyncThunk("note/getFolder", async (reqData, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:8080/v1/folders");
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});


export const addFolder = createAsyncThunk("note/addFolder", async (reqData, { rejectWithValue }) => {
    try {
            let params = {
                name: reqData.name,
            }
            const { data } = await axios.post('http://localhost:8080/v1/folders', params);
            return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

