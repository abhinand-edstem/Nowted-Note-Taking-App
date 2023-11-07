import { createSlice } from "@reduxjs/toolkit";
import { getFolder } from "./FolderAction";

const FolderSlice = createSlice({
    name: "folder",
    initialState: {
        loading: false,
        folder: [],
    },
    reducers: {},
    extraReducers: builder => {
        //get folder
        builder.addCase(getFolder.pending, state => {
            state.folder = [];
            state.loading = true;
        });
        builder.addCase(getFolder.fulfilled, (state, actions) => {
            state.folder = actions.payload;
        });
        builder.addCase(getFolder.rejected, (state, { payload }) => {
            state.loading = false;
        });
    }
});

export default FolderSlice.reducer;