import { useState } from 'react';
import { IInputFormProps } from '../components/InputForm/InputForm';

const useInputFormHook = ({ handleSubmit }: IInputFormProps) => {
    const [input, setInput] = useState('');

    const handleClick = () => {
        handleSubmit(input);
        setInput('');
    };

    return { input, setInput, handleClick };
};

export default useInputFormHook;
