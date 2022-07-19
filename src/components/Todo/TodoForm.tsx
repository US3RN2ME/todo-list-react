import React, { FormEvent, useState, FC } from 'react';
import { v4 as uuid } from 'uuid';
import { ITodo } from "./Todo";

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
            text: input
        });
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input autoFocus type="text" placeholder="Add a todo"
                   name="text" className="todo-input"
                   onChange={e => setInput(e.target.value)}
                   value={input}
            />
            <button className="todo-button">
                Add todo
            </button>
        </form>
    );
};

export default TodoForm;
