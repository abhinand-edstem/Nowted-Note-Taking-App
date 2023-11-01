import { createSlice } from "@reduxjs/toolkit";
import { getArchived } from "./ArchivedActions";

const ArchivedSlice = createSlice({
    name: "archive",
    initialState: {
        loading: false,
        trash: [],
    },
    reducers: {},
    extraReducers: builder => {
        //get Archive
        builder.addCase(getArchived.pending, state => {
            state.Archive = [];
            state.loading = true;
        });
        builder.addCase(getArchived.fulfilled, (state, actions) => {
            state.Archive = actions.payload;
        });
        builder.addCase(getArchived.rejected, (state, { payload }) => {
            state.loading = false;
        });
    }
});

export default ArchivedSlice.reducer;