import React from 'react';
import './LoginForm.css';
import useRegisterFormHook from '../../hooks/useRegisterFormHook';

const RegisterForm = () => {
    const { register, onSubmit, handleSubmit, errors, errorMessage, watch } =
        useRegisterFormHook();

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Email"
                className={errors.login ? 'form-input required' : 'form-input'}
                {...register('email', {
                    required: true,
                    pattern:
                        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
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

            {errorMessage && (
                <div className="form-error-message">errorMessage</div>
            )}

            <button className="login-button" type="submit">
                Sign up
            </button>
        </form>
    );
};

export default RegisterForm;
