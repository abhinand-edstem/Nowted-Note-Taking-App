import { createSlice } from "@reduxjs/toolkit";
import { getTrash } from "./TrashAction";

const trashSlice = createSlice({
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
    }
});

export default trashSlice.reducer;