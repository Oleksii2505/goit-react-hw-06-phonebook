import { useState } from 'react';
import { Form, Label, Input, SubmitBtn } from './ContactForm.styled';

export const ContactForm = ({ onSubmit }) => {
    const [state, setState] = useState({
        name: '',
        number: '',
    });

    const onFormSubmit = e => {
        e.preventDefault();
        onSubmit(state);
        resetForm();
    };

    const resetForm = () => {
        setState({ name: '', number: '' });
    };

    const onInputChange = e => {
        const { name, value } = e.currentTarget;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Form onSubmit={onFormSubmit}>
            <Label>
                Name
                <Input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яіїєґА-ЯІЇЄҐ]+(([' -][a-zA-Zа-яіїєґА-ЯІЇЄҐ ])?[a-zA-Zа-яіїєґА-ЯІЇЄҐ]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    placeholder="Enter contact name"
                    onChange={onInputChange}
                    value={state.name}
                />
            </Label>
            <Label>
            Number
                <Input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    placeholder="Enter contact number"
                    onChange={onInputChange}
                    value={state.number}
                />
            </Label>
            <SubmitBtn type="submit">Add contact</SubmitBtn>
        </Form>
    );
};
