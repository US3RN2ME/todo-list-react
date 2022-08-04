import React, { useState } from 'react'
import "./LoginForm.css"
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [repeatPassword, setRepeatPassword] = useState("");
   const navigate = useNavigate();

   const auth = () => {
      if(login && password && password === repeatPassword) {
         navigate("/login");
      }
   }

   return (
      <div className="login-form">
         <input  type="text" className="form-input" placeholder="Login"
                 name="login" onChange={e => setLogin(e.target.value)}
                 value={login}
         />
         <input  type="password" className="form-input" placeholder="Password"
                 name="password" onChange={e => setPassword(e.target.value)}
                 value={password}
         />
         <input  type="password" className="form-input" placeholder="Repeat Password"
                 name="repeat-password" onChange={e => setRepeatPassword(e.target.value)}
                 value={repeatPassword}
         />
         <button className="login-button" onClick={auth}>Sign up</button>
      </div>
   )
}

export default RegisterForm;
