import { configureStore } from '@reduxjs/toolkit';

import NotesSlice from './store/allNotes/NotesSlice';
import TrashSlice from './store/allTrash/TrashSlice';
import ArchivedSlice from './store/allArchived/ArchivedSlice';

export const store = configureStore({
  reducer: {
    note: NotesSlice,
    trash: TrashSlice,
    archive: ArchivedSlice
  },
})