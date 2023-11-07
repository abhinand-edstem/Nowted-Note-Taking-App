import { configureStore } from '@reduxjs/toolkit';

import NotesSlice from './store/allNotes/NotesSlice';
import FolderSlice from './store/allFolder/FolderSlice';

export const store = configureStore({
  reducer: {
    note: NotesSlice,
    folder : FolderSlice
  },
})