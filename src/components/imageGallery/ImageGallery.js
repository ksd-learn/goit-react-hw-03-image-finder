import { Component } from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';
import { Loader } from '../loader/Loader';
import { apiPixabay } from '../../api/apiServicces';
import { queryApi } from '../../api/queryApi';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {

    state = {
        data: [],
        page: 1,
        status: 'start',                            // "start", "pending", "resolved", "error"
        idImgModal: 0,
        showModal: false,
        error: 'null'
    };
                                                    // метод записи в state
    addPage = (dataPage) => {
        this.setState(
            (prevstate) => {
                if (dataPage.length > 0) {
                    const newData = prevstate.data.concat(dataPage);
                    return { data: newData}
                }
            }
        )
    };
                                                    // формирование шаблона массива state.data
    patternPage = (dataPage) => {
        return (
            dataPage.map(item => {
                return {
                    id: item.id,
                    webformatURL: item.webformatURL,
                    largeImageURL: item.largeImageURL,
                    user: item.user
            }})
        )
    }
                                                    // подготовка и запись в state данных, полученных с сервера API 
    dataQueryApi = (page) => {
        let queryValue = this.props.nameSearch;
        let url = apiPixabay(queryValue, page);

        queryApi(url)
            .then(dataPage => {
                if (dataPage.length > 0){
                    return this.patternPage(dataPage)
                } else {
                    return Promise.reject(new Error("Поиск завершен"))
                }  
            })
            .then((dataPattern => this.addPage(dataPattern)))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ status: 'resolved' }))
    }
                                                    // действие кнопки "Load more"
    handlBtnLoadMore = () => {
        let newPage = this.state.page + 1;
        this.setState({ status: 'pending', page: newPage });
        this.dataQueryApi(newPage);
    }
    
                                                    // условия обработки данных запроса
    switchModal = (id) => {
        this.setState(({ showModal }) => (
            { idImgModal: id, showModal: !showModal }
        ))
    }

    componentDidUpdate(prevProps, prevState) {
        let queryValue = this.props.nameSearch;

        if (prevProps.nameSearch !== queryValue) {
            this.setState({
                    data: [],
                    status: 'pending',
                    page: 1,
                    showModal: false,
                    error: 'null'
            });
            this.dataQueryApi(1);
        }

        if (this.state.error.message === "Поиск завершен") {
            this.setState({
                    status: 'start',
                    page: 1,
                    error: 'null'
            });
        }
    }
    
    render() {

        let { data, status, idImgModal, showModal } = this.state;
        const dataPhoto = data.find(item => item.id === idImgModal);

        return (
            <section className={css.sectionGallery}>
                <ul className={css.imageGallery}>
                    <ImageGalleryItem data={data} onOpen={this.switchModal} />
                </ul>

                { (status === 'pending' || status === 'resolved')
                    && <Button onClick={this.handlBtnLoadMore} />}

                {status === 'pending'
                    && <Loader />}

                {showModal
                    && <Modal dataPhoto={dataPhoto} onClose={this.switchModal} />}
            </section>
        )
    }
}

ImageGallery.propTypes = {
    nameSearch: PropTypes.string.isRequired,
};