import React from 'react';
import { observer } from 'mobx-react';
import { AiOutlineClose } from 'react-icons/ai';
import modalStore from '../../stores/modalStore';
import InputForm from '../InputForm/InputForm';
import './Modal.css';
import { Outlet, useNavigate } from 'react-router-dom';

const Modal = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={'modal active'} onClick={() => navigate(-1)}>
                <div
                    className={'modal-content active'}
                    onClick={(e) => e.stopPropagation()}
                >
                    <AiOutlineClose
                        className="modal-close"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="modal-header">{modalStore.header}</h1>
                    <InputForm handleSubmit={modalStore.handleSubmit} />
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default observer(Modal);
