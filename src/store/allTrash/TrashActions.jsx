import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTrash = createAsyncThunk("note/getTrash", async (reqData, { rejectWithValue }) => {
    try {
        if (!reqData) {
            const { data } = await axios.get("http://localhost:8080/v1/notes/trashed");
            return data;
        } else {
            const { data } = await axios.delete(`http://localhost:8080/v1/notes/${reqData}/trash`);
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
            const { data } = await axios.delete(`http://localhost:8080/v1/notes/${reqData}/delete`);
            return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

