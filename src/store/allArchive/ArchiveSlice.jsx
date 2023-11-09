import { createSlice } from "@reduxjs/toolkit";
import { getArchived } from "./ArchiveActions";

const ArchiveSlice = createSlice({
    name: "archived",
    initialState: {
        loading: false,
        archived: [],
    },
    reducers: {},
    extraReducers: builder => {
        //get trash
        builder.addCase(getArchived.pending, state => {
            state.archived = [];
            state.loading = true;
        });
        builder.addCase(getArchived.fulfilled, (state, actions) => {
            state.archived = actions.payload;
        });
        builder.addCase(getArchived.rejected, (state, { payload }) => {
            state.loading = false;
        });
    }
});

export default ArchiveSlice.reducer;