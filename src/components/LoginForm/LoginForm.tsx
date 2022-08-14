import React from 'react'
import "./LoginForm.css"
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'



const LoginForm = () => {
   const navigate = useNavigate();
   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      console.log(data);
      navigate("/lists");
   }

   return (
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
         <input className={errors.login ? "form-input required" : "form-input"}
                type="text" placeholder="Login"
                {...register("login", { required: true })}
         />

         <input className={errors.password ? "form-input required" : "form-input"}
                type="password"  placeholder="Password"
                {...register("password", { required: true })}
         />

         <div className="login-buttons">
            <button className="login-button" type="submit">Sign in</button>
            <button className="login-button" onClick={() => navigate("/register")}>Sign up</button>
         </div>
      </form>
   )
}

export default LoginForm;
