import React, { FC, useState } from 'react'
import {IoIosAdd} from "react-icons/io"
import "./InputForm.css"


interface IInputFormProps {
   handleSubmit: (text: string) => void
}

const InputForm: FC<IInputFormProps> = ({ handleSubmit = (s: string) => {} }) => {
   const [input, setInput] = useState("");

   const handleClick = () => {
      handleSubmit(input);
      setInput("");
   }

   return (
      <div className="input-form">
         <input  autoFocus type="text"
                 name="text" className="form-input"
                 onChange={e => setInput(e.target.value)}
                 value={input}
                 onKeyDownCapture={e => {
                    if (e.key === "Enter") handleClick();
                 }}
         />
         <IoIosAdd className="form-button" onClick={handleClick} />
      </div>
   );
};

export default InputForm;
