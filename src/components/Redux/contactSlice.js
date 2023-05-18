import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import  storage  from "redux-persist/lib/storage";
import { nanoid } from "nanoid";


const contactSlice = createSlice({
    name: 'contacts',
    initialState: {numbers: []},
    reducers: {
        addContact(state, { payload }) {
      
            state.numbers.push({ ...payload, id: nanoid() });
          },
          delContact(state, action) {
            const index = state.numbers.findIndex(
              contact => contact.id === action.payload
            );
            state.numbers.splice(index, 1);
          },
    },   
})

const persistConfig = {
    key: 'contacts',
    storage,
    whitelist: ['numbers'],
};

export const contactReducer = persistReducer(
    persistConfig,
    contactSlice.reducer
);

export const {addContact, delContact} = contactSlice.actions;
