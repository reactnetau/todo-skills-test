import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { INote } from '../interfaces/INotes'

export interface NotesState {
  notes: INote[];
}

const initialState: NotesState = {
  notes: [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<INote>) => {
      const note = action.payload;
      const newNotes = [...state.notes, note] as INote[];
      state.notes = newNotes;
    },
    deleteNote: (state, action: PayloadAction<INote>) => {
      const index = state.notes.findIndex(({ note }: INote) => note.id === action.payload.note.id);
      state.notes.splice(index, 1);
    },
    editNote: (state, action: PayloadAction<INote>) => {
      const index = state.notes.findIndex(({ note }) => note.id === action.payload.note.id);
      state.notes[index] = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNote, deleteNote, editNote } = notesSlice.actions

export default notesSlice.reducer