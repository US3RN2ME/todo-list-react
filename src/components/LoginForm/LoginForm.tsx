import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import authController from '../../stores/authController';

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (fieldValues) => {
        const { email, password } = fieldValues;
        try {
            await authController.login(email, password);
            setErrorMessage('');
            navigate('/lists');
        } catch (ex) {
            setErrorMessage((ex as Error).message);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
                className={errors.login ? 'form-input required' : 'form-input'}
                type="text"
                placeholder="Email"
                {...register('email', { required: true })}
            />

            <input
                className={
                    errors.password ? 'form-input required' : 'form-input'
                }
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
            />

            <div className="login-buttons">
                <button className="login-button" type="submit">
                    Sign in
                </button>
                <button
                    className="login-button"
                    onClick={() => navigate('/register')}
                >
                    Sign up
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
