import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getArchived = createAsyncThunk("note/getArchived", async (reqData, { rejectWithValue }) => {
    try {
        if (!reqData) {
            const { data } = await axios.get("http://localhost:8080/v1/notes/archived");
            return data;
        } else {
            const { data } = await axios.put(`http://localhost:8080/v1/notes/${reqData}/archive`);
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


export const restoreArchive = createAsyncThunk("note/restoreArchive", async (reqData, { rejectWithValue }) => {
    debugger;
    try {
            const { data } = await axios.delete(`http://localhost:8080/v1/notes/${reqData}/archive`);
            return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
