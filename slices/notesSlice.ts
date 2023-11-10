import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { INote } from '../src/interfaces/INotes'

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
      const note = action.payload;
      const index = state.notes.indexOf(note)
      state.notes.splice(index, 1);
    },
    editNote: (state, action: PayloadAction<INote>) => {
      const array = state.notes;
      const elementPos = array.map(function(x) {return x.id; }).indexOf(action.payload.id);
      state.notes[elementPos] = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNote, deleteNote, editNote } = notesSlice.actions

export default notesSlice.reducer