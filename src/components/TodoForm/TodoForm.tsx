import React, { FormEvent, useState, FC } from 'react';
import { v4 as uuid } from 'uuid';
import { ITodo } from "../Todo/Todo";
import "./TodoForm.css"
import {IoIosAdd} from "react-icons/io"

interface ITodoFormProps {
    onSubmit: (e: ITodo) => void
}

const TodoForm:FC<ITodoFormProps> = ({ onSubmit }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setInput("");
        onSubmit({
            id: uuid(),
            text: input.trim()
        });
    }

    return (
        <form className="todo-form">
            <input  autoFocus type="text"
                    name="text" className="todo-input"
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    onKeyDownCapture={e => {
                        if (e.key === "Enter") handleSubmit(e);
                    }}
            />
            <IoIosAdd className="todo-button" onClick={handleSubmit}/>
        </form>
    );
};

export default TodoForm;
