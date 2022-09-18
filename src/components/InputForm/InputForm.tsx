import React, { FC } from 'react';
import { IoIosAdd } from 'react-icons/io';
import './InputForm.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export interface InputFormProps {
    handleClick: (text: string) => void;
}

const InputForm: FC<InputFormProps> = ({ handleClick }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = (fieldValues) => {
        handleClick(fieldValues.input);
        reset({ input: '' });
    };

    return (
        <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <input
                autoFocus
                type="text"
                className="form-input"
                {...register('input', {
                    required: true,
                    pattern: /^[A-Za-z0-9]*$/,
                })}
            />

            <IoIosAdd
                className="form-button"
                onClick={handleSubmit(onSubmit)}
            />
        </form>
    );
};

export default InputForm;
