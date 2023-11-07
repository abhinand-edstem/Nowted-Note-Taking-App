import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getNotes = createAsyncThunk("note/getNotes", async (reqData, { rejectWithValue }) => {
    try {
        if (!reqData) {
            const { data } = await axios.get("http://localhost:8080/v1/notes");
            return data;
        } else {
            let params = {
                title: reqData.title,
                content: reqData.content,
                folder: reqData.folder,
                createdDate: reqData.createdDate
            }
            const { data } = await axios.post('http://localhost:8080/v1/notes', params);
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

export const noteDelete = createAsyncThunk("note/noteDelete", async (reqData, { rejectWithValue }) => {
    debugger;
    try {
        let params = {
            id : reqData.id
        }
            const { data } = await axios.delete(`http://localhost:8080/v1/notes/${params.id}`)
            return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
