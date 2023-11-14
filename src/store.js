import { configureStore } from '@reduxjs/toolkit';

import NotesSlice from './store/allNotes/NotesSlice';
import FolderSlice from './store/allFolder/FolderSlice';
import ArchiveSlice from './store/allArchive/ArchiveSlice';
import openAddForm from './store/localStore/openAddForm';

export const store = configureStore({
  reducer: {
    note: NotesSlice,
    folder: FolderSlice,
    archive: ArchiveSlice,
    open: openAddForm,
  },
})