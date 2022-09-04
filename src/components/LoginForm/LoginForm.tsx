import React from 'react';
import './LoginForm.css';
import useLoginFormHook from '../../hooks/useLoginFormHook';

const LoginForm = () => {
    const { navigate, register, handleSubmit, errors, onSubmit } =
        useLoginFormHook();

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
