import React, { useState } from 'react'
import "./LoginForm.css"
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const auth = () => {
      if(login && password) {
         navigate("/lists");
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
         <div className="login-buttons">
            <button className="login-button" onClick={auth}>Sign in</button>
            <button className="login-button" onClick={() => navigate("/register")}>Sign up</button>
         </div>
      </div>
   )
}

export default LoginForm;
