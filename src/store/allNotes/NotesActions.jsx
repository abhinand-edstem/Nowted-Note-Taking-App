import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const    getNotes = createAsyncThunk("note/getNotes", async (reqData, { rejectWithValue }) => {
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

export const noteDelete = createAsyncThunk("note/noteDelete", async (reqData, { rejectWithValue }) => {
    try {
        let params = {
            id: reqData.id
        }
        const { data } = await axios.put(`http://localhost:8080/v1/notes/${params.id}/trash`)
        return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});