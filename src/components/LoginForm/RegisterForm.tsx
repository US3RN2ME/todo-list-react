import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import authController from '../../stores/authController';

const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (fieldValues) => {
        const { email, password } = fieldValues;
        try {
            await authController.register(email, password);
            setErrorMessage('');
            navigate('/login');
        } catch (ex) {
            setErrorMessage((ex as Error).message);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Email"
                className={errors.login ? 'form-input required' : 'form-input'}
                {...register('email', {
                    required: true,
                    pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
            />
            <input
                type="password"
                placeholder="Password"
                className={
                    errors.password ? 'form-input required' : 'form-input'
                }
                {...register('password', {
                    required: true,
                    minLength: 8,
                })}
            />
            <input
                type="password"
                placeholder="Repeat Password"
                className={
                    errors.repeatPassword ? 'form-input required' : 'form-input'
                }
                {...register('repeatPassword', {
                    required: true,
                    validate: (value) => value === watch('password'),
                })}
            />

            <div className="form-error-message">{errorMessage}</div>

            <button className="login-button" type="submit">
                Sign up
            </button>
        </form>
    );
};

export default RegisterForm;
