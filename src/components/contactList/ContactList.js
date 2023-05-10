import { UserContact } from '../userContact/UserContact';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contactSeach, deleteContacts }) => {
    return (
        <ul> 
            {contactSeach.map(({name, number, id}) => {
                return (
                    <li className={css.user} key={id}>
                        <UserContact name={name} number={number} />
                        <button className={css.btn} onClick={() => {deleteContacts(id)}}>Delete</button>
                    </li>
                );
            })}
        </ul>
    )
}

ContactList.propTypes = {
    contactSeach: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired
    })).isRequired,
    deleteContacts: PropTypes.func.isRequired
};