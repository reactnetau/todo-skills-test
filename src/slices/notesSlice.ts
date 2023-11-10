import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { INote } from '../interfaces/INotes'

export interface NotesState {
  notes: []
}

const initialState: NotesState = {
  notes: [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{}>) => {
      const newNotes = state.notes;
      newNotes.push(action.payload);
      state.notes = newNotes;
    },
    deleteNote: (state, action: PayloadAction<INote>) => {
      const index = state.notes.findIndex(obj => obj.id === action.payload.id);
      state.notes.splice(index, 1);
    },
    editNote: (state, action: PayloadAction<INote>) => {
      const note = action.payload;
      const array = state.notes;
      const index = state.notes.findIndex(obj => obj.id === action.payload.id);
      state.notes[index] = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNote, deleteNote, editNote } = notesSlice.actions

export default notesSlice.reducer