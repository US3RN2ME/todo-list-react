import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { url } from './url';

const useRegisterFormHook = () => {
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
        const { data } = await axios.post(url + 'auth/register', {
            email,
            password,
        });
        if (data.status == 401) {
            setErrorMessage(data.response);
        } else {
            navigate('/login');
        }
    };

    return { register, onSubmit, handleSubmit, errors, errorMessage, watch };
};

export default useRegisterFormHook;
