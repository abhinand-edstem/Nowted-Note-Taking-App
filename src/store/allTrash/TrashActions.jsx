import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTrash = createAsyncThunk("note/getTrash", async (reqData, { rejectWithValue }) => {
    try {
        if (!reqData) {
            const { data } = await axios.get("http://localhost:8080/v1/trash");
            return data;
        } else {
            const { data } = await axios.put(`http://localhost:8080/v1/trash/${reqData}/restore`);
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

export const deleteTrash = createAsyncThunk("note/deleteTrash", async (reqData, { rejectWithValue }) => {
    try {
        debugger;
            const { data } = await axios.delete(`http://localhost:8080/v1/trash/${reqData}`);
            return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

