import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({data, onOpen}) => {
    return (
        <>
            {data.map(({id, webformatURL, user}) => {
                return (
                    < li key={id} className={css.imageGalleryItem} onClick={() => {onOpen(id)}}>
                        <img src={webformatURL} alt={user} />
                    </li>
                )
            })}
        </>
    )
}

ImageGalleryItem.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            webformatURL: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired
        })
    ).isRequired,
    onOpen: PropTypes.func.isRequired,
};