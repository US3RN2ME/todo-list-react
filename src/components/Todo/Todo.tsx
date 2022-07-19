import React, { FC, useState } from 'react';
import {RiCloseCircleLine} from "react-icons/ri";
import {TiEdit} from "react-icons/ti";

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

    return <div className={todo.isComplete ? "todo-row complete" : "todo-row"}>
        { edit.id
            ? <input autoFocus type="text"
                   className="todo-edit"
                   value={input}
                   onChange={e => setInput(e.target.value)}
                   onBlur={() => finishEdit(input)}
            />
            : <div onClick={() => completeTodo(todo)}>
                {todo.text}
            </div>
        }
        <div className="icons">
            <RiCloseCircleLine
                onClick={() => removeTodo(todo)}
                className="delete-icon"
            />
            <TiEdit
                onClick={() => edit.id
                    ? finishEdit(input)
                    : startEdit()}
                className="edit-icon"
            />
        </div>
    </div>
}

export default Todo;
export type {ITodo};