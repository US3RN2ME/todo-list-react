import React, {FC, useState} from 'react';
import {RiCloseLine} from "react-icons/ri";
import {RiEdit2Line} from "react-icons/ri";
import { observer} from "mobx-react";
import todoListStore, { ITodo } from "../../stores/todoListStore";
import {useLocation} from "react-router-dom";
import "./Todo.css"

interface ITodoProps {
    todo: ITodo,
}

const Todo: FC<ITodoProps> = ({todo}) => {
    const [input, setInput] = useState(todo.text);
    const [edit, setEdit] = useState<ITodo>({ id: "", text: "" });
    const location = useLocation().pathname;

    const startEdit = () => {
        setEdit({id: todo.id, text: todo.text});
    }

    const finishEdit = (text: string) => {
        todoListStore.editTodo(edit.id, text, location);
        setEdit({ id: "", text: "" });
    }

    return (
        <div className={todo.isComplete ? "todo-row complete" : "todo-row"}>
            <div className="todo-inputs">
                <input onChange={() => todoListStore.completeTodo(todo.id, location)}
                       type="checkbox" className="todo-checkbox"
                />
                <input disabled={!edit.id} type="text"
                       className="todo-edit"
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       onBlur={() => finishEdit(input)}
                       onKeyDownCapture={e => {
                           if (e.key === "Enter") finishEdit(input);
                       }}
                />
            </div>
        <div className="icons">
            <RiEdit2Line
                onClick={() => startEdit()}
                className="edit-icon"
            />
            <RiCloseLine
                onClick={() => todoListStore.removeTodo(todo.id, location)}
                className="delete-icon"
            />
        </div>
    </div>
    );
}

export default observer(Todo);
export type {ITodo};