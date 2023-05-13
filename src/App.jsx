import React, {useState, useEffect} from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "components/ContactForm";
import { Filter } from "components/Filter";
import { ContactList } from "components/ContactList";
import { Container, TitlePhonebook, TitleContacts } from './App.styled';

const STORAGE_KEY = 'contacts';


const initialContacts = [
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
    const [contacts, setContacts] = useState(() => {
        const storedContacts = localStorage.getItem(STORAGE_KEY);
        return storedContacts ? JSON.parse(storedContacts) : initialContacts;
        });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);
    
    const onFormSubmit = data => {
        const nameInclude = contacts.find(value => value.name.toLowerCase() === data.name.toLowerCase());
        if (nameInclude) {
            alert(`${data.name} is already in contacts.`);
            return;
        }
    
        const numberInclude = contacts.find(option => option.number === data.number);
        if (numberInclude) {
            alert(`${data.number} is already in contacts as ${numberInclude.name}.`);
            return;
        }
    
        setContacts(prevContacts => [...prevContacts, { ...data, id: nanoid() }]);
    };

    const getFilteredContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
    };
    
    const deleteContacts = contactId => {
        setContacts(prevContacts =>
            prevContacts.filter(contact => contact.id !== contactId)
        );
    };

    return (
        <Container>
            <TitlePhonebook>Phonebook</TitlePhonebook>
            <ContactForm onSubmit={onFormSubmit} />
    
            <TitleContacts>Contacts</TitleContacts>
            <Filter value={filter} onFilter={e => setFilter(e.target.value)} />
            <ContactList
                list={getFilteredContacts()}
                delContact={deleteContacts}
            />
        </Container>
    );
}
