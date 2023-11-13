import { createSlice } from "@reduxjs/toolkit";
import { getNotes, getTrash } from "./NotesActions";

const NoteSlice = createSlice({
    name: "notes",
    initialState: {
        loading: false,
        notes: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getNotes.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(getNotes.fulfilled, (state, actions) => {
            state.notes = actions.payload;
        });
        builder.addCase(getNotes.rejected, (state, { payload }) => {
            state.loading = false;
        });
        builder.addCase(getTrash.pending, state => {
            state.notes = [];
            state.loading = true;
        });
        builder.addCase(getTrash.fulfilled, (state, actions) => {
            state.notes = actions.payload;
        });
        builder.addCase(getTrash.rejected, (state, { payload }) => {
            state.loading = false;
        });
    }
    
});

export default NoteSlice.reducer;