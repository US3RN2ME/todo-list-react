import React, { FC } from 'react';
import { IoIosAdd } from 'react-icons/io';
import './InputForm.css';
import useInputFormHook from '../../hooks/useInputFormHook';

export interface IInputFormProps {
    handleSubmit: (text: string) => void;
}

const InputForm: FC<IInputFormProps> = ({ handleSubmit }) => {
    const { input, setInput, handleClick } = useInputFormHook({ handleSubmit });

    return (
        <div className="input-form">
            <input
                autoFocus
                type="text"
                name="text"
                className="form-input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyDownCapture={(e) => {
                    if (e.key === 'Enter') handleClick();
                }}
            />
            <IoIosAdd className="form-button" onClick={handleClick} />
        </div>
    );
};

export default InputForm;
