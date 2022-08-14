import React from 'react'
import "./LoginForm.css"
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'

const RegisterForm = () => {
   const navigate = useNavigate();
   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit: SubmitHandler<FieldValues> = () => {
      navigate("/login");
   }

   return (
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
         <input  type="text" placeholder="Login"
                 className={errors.login ? "form-input required" : "form-input"}
                 {...register("login", { required: true })}
         />
         <input  type="password" placeholder="Password"
                 className={errors.password ? "form-input required" : "form-input"}
                 {...register("password", { required: true })}
         />
         <input  type="password" placeholder="Repeat Password"
                 className={errors.repeatPassword ? "form-input required" : "form-input"}
                 {...register("repeatPassword", { required: true })}
         />
         <button className="login-button" type="submit">Sign up</button>
      </form>
   )
}

export default RegisterForm;
