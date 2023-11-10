import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'main',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({ 
  notes: notesReducer
})

const persistedReducer = persistReducer(persistConfig, notesReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)