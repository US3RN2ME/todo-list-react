import React, {useState} from 'react';
import {IoIosAdd} from "react-icons/io"
import {observer} from "mobx-react";
import {useLocation} from "react-router-dom";
import todoListStore from "../../stores/todoListStore";
import "./TodoForm.css"

const TodoForm = () => {
    const [input, setInput] = useState("");
    const location = useLocation().pathname;

    const handleClick = () => {
        setInput("");
        todoListStore.addTodo(input.trim(), location);
    }

    return (
        <div className="todo-form">
            <input  autoFocus type="text"
                    name="text" className="todo-input"
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    onKeyDownCapture={e => {
                        if (e.key === "Enter") handleClick();
                    }}
            />
            <IoIosAdd className="todo-button" onClick={handleClick}/>
        </div>
    );
};

export default observer(TodoForm);
