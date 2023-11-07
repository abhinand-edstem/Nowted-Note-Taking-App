import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFolder = createAsyncThunk("note/getFolder", async (reqData, { rejectWithValue }) => {
    debugger;
    try {
        if (!reqData) {
            const { data } = await axios.get("http://localhost:8080/v1/folders");
            console.log("foldertrrr", data);
            return data;
        } else {
            debugger;
            let params = {
                title: reqData.title,
                // id:65,
                author : 'aishuuuu'
                // password: reqData.password
            }
            const { data } = await axios.delete('', params);
            console.warn("gggggg", data);
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
