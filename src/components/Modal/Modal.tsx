import React from 'react';
import { observer } from 'mobx-react';
import { AiOutlineClose } from 'react-icons/ai';
import InputForm from '../InputForm/InputForm';
import './Modal.css';
import { useNavigate } from 'react-router-dom';
import todoListController from '../../stores/todoListController';
import { toRoute } from '../../functions/routes';

const Modal = () => {
    const navigate = useNavigate();
    const header = 'Add sidebar item';

    const handleSubmit = async (text: string) => {
        text = text.replace(/ +/g, ' ').trim();
        if (
            todoListController.getListByName(text) ||
            ['add', 'home'].includes(text.toLowerCase())
        )
            return;
        await todoListController.addList(text);
        navigate('/lists/' + toRoute(text));
    };

    return (
        <>
            <div className="modal active" onClick={() => navigate(-1)}>
                <div
                    className="modal-content active"
                    onClick={(e) => e.stopPropagation()}
                >
                    <AiOutlineClose
                        className="modal-close"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="modal-header">{header}</h1>
                    <InputForm handleClick={handleSubmit} />
                </div>
            </div>
        </>
    );
};

export default observer(Modal);
