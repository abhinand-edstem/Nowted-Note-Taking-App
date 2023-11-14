import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getNotes = createAsyncThunk("note/getNotes", async (reqData, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:8080/v1/notes");
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const addNotes = createAsyncThunk("note/addNotes", async (reqData, { rejectWithValue }) => {
    try {
        let params = {
            title: reqData.title,
            content: reqData.content,
            folder: reqData.folder,
            createdDate: reqData.createdDate
        }
        const { data } = await axios.post('http://localhost:8080/v1/notes', params);
        return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const updateNotes = createAsyncThunk("note/updateNotes", async (reqData, { rejectWithValue }) => {
    try {
        let params = {
            id: reqData.id
        }
        let paramsOne = {
            title: reqData.title,
            content: reqData.content,
            createdDate: reqData.createdDate,
            folderId: reqData.folderId
        }
        const { data } = await axios.put(`http://localhost:8080/v1/notes/${params.id}`, paramsOne)
        return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const favButtonClickAction = createAsyncThunk("note/favButtonClickAction", async (reqData, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("http://localhost:8080/v1/notes/favorites")
        return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});


export const favDelete = createAsyncThunk("note/favDelete", async (reqData, { rejectWithValue }) => {
    try {
        if (reqData.favorite) {
            let params = {
                id: reqData.id
            }
            const { data } = await axios.delete(`http://localhost:8080/v1/notes/${params.id}/favorite`)
            return data;
        }
        else {
            let params = {
                id: reqData.id
            }
            const { data } = await axios.put(`http://localhost:8080/v1/notes/${params.id}/favorite`)
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



export const archiveItemAction = createAsyncThunk("note/archiveItemAction", async (reqData, { rejectWithValue }) => {
    try {
        let params = {
            id: reqData
        }
        const { data } = await axios.put(`http://localhost:8080/v1/notes/${params.id}/archive`)
        return data;

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

export const moveToTrash = createAsyncThunk("note/moveToTrash", async (reqData, { rejectWithValue }) => {
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