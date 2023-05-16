import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import  storage  from "redux-persist/lib/storage";
import { nanoid } from "nanoid";

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
        ]
    },
    reducers: {
        addContact(state, action) {
            state.contacts.push({
                id: nanoid(),
                name: action.payload.name,
                number: action.payload.number
            })
        },
        delContact(state, action) {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id)
        }
    }
})

const persistConfig = {
    key: 'contacts',
    storage,
    whitelist: ['contacts'],
};

export const contactReducer = persistReducer(
    persistConfig,
    contactSlice.reducer
);

export const {addContact, delContact} = contactSlice.actions;
