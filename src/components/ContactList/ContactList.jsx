import PropTypes from 'prop-types';
import { DeleteBtn, Item, List } from './ContactList.styled';
import { delContact } from 'components/Redux/contactSlice';
import { useSelector } from 'react-redux';

export const ContactList = () => {
    const contacts = useSelector(state => state.contacts.contacts);
    const filter = useSelector(state => state.filter.filter);
    const list = contacts.filter(contact =>  contact.name.toLocaleLowerCase().includes(filter));
    return (
        <List>
            {list.map(({ id, name, number }) => {
                return (
                    <Item key={id}>
                        {name}: {number}{' '}
                        <DeleteBtn
                            type="button"
                            onClick={() => delContact(id)}
                        >
                            Delete
                        </DeleteBtn>
                    </Item>
                );
            })}
        </List>
    );
};

ContactList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
};