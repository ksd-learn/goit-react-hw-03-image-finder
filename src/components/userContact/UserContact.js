import css from './UserContact.module.css';
import PropTypes from 'prop-types';

export const UserContact = ({ name, number }) => {
    return (
        <>
            <p className={css.inf}>Name:  {name}</p>
            <p className={css.inf}>Number:  {number}</p>
        </>
    );
}

UserContact.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
};