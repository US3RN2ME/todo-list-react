import React, {FC, useState} from 'react';
import {RiCloseLine} from "react-icons/ri";
import {RiEdit2Line} from "react-icons/ri";
import "./Todo.css"

interface ITodo {
    id: string,
    text: string,
    isComplete?: boolean
}

interface ITodoProps {
    todo: ITodo,
    completeTodo: (todo: ITodo) => void,
    removeTodo: (todo: ITodo) => void,
    editTodo: (todo: ITodo, text: string) => void,
}

const Todo: FC<ITodoProps> = ({todo, completeTodo, removeTodo, editTodo}) => {
    const [input, setInput] = useState(todo.text);
    const [edit, setEdit] = useState<ITodo>({ id: "", text: "" });

    const startEdit = () => {
        setEdit({id: todo.id, text: todo.text});
    }

    const finishEdit = (text: string) => {
        editTodo(edit, text);
        setEdit({ id: "", text: "" });
    }

///TODO
    return (
        <div className={todo.isComplete ? "todo-row complete" : "todo-row"}>
            <div className="todo-inputs">
                <input onChange={() => completeTodo(todo)} type="checkbox" className="todo-checkbox" />
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
                onClick={() => removeTodo(todo)}
                className="delete-icon"
            />
        </div>
    </div>
    );
}

export default Todo;
export type {ITodo};