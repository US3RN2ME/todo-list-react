import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { url } from './url';

const useLoginFormHook = () => {
    // {setIsLoggedIn}

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (fieldValues) => {
        const { data } = await axios.post(url + 'auth/login', {
            email: fieldValues['email'],
            password: fieldValues['password'],
        });
        if (data.status == 401) {
            setErrorMessage(data.response);
        } else {
            localStorage.setItem('token', data.token);
            //setIsLoggedIn(true);
            navigate('/lists');
        }
    };

    return {
        navigate,
        register,
        handleSubmit,
        onSubmit,
        errors,
        errorMessage,
    };
};

export default useLoginFormHook;
