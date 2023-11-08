import { createSlice } from "@reduxjs/toolkit";
import { deleteTrash, getTrash } from "./TrashActions";

const TrashSlice = createSlice({
    name: "trash",
    initialState: {
        loading: false,
        trash: [],
    },
    reducers: {},
    extraReducers: builder => {
        //get trash
        builder.addCase(getTrash.pending, state => {
            state.trash = [];
            state.loading = true;
        });
        builder.addCase(getTrash.fulfilled, (state, actions) => {
            state.trash = actions.payload;
        });
        builder.addCase(getTrash.rejected, (state, { payload }) => {
            state.loading = false;
        });
         //get trash
         builder.addCase(deleteTrash.pending, state => {
            state.trash = [];
            state.loading = true;
        });
        builder.addCase(deleteTrash.fulfilled, (state, actions) => {
            debugger;
            state.trash = actions.payload;
        });
        builder.addCase(deleteTrash.rejected, (state, { payload }) => {
            state.loading = false;
        });
    }
});

export default TrashSlice.reducer;