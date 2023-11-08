import { configureStore } from '@reduxjs/toolkit';

import NotesSlice from './store/allNotes/NotesSlice';
import FolderSlice from './store/allFolder/FolderSlice';
import TrashSlice from './store/allTrash/TrashSlice';

export const store = configureStore({
  reducer: {
    note: NotesSlice,
    folder : FolderSlice,
    trash : TrashSlice
  },
})