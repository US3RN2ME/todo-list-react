import React, {FC, useState} from 'react';
import {RiCloseLine} from "react-icons/ri";
import {RiEdit2Line} from "react-icons/ri";
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react";
import todoListStore, { ITodo } from "../../stores/todoListStore";
import "./Todo.css"
import sidebarStore from '../../stores/sidebarStore'


interface ITodoProps {
    todo: ITodo,
}

const Todo: FC<ITodoProps> = ({todo}) => {
    const [input, setInput] = useState(todo.text);
    const [edit, setEdit] = useState<ITodo>({ id: "", text: "" });
    let location  = useLocation().pathname;
    if(todo.parent) {
        location = todo.parent;
    }

    const startEdit = () => {
        if(todo.isComplete) return;
        setEdit({id: todo.id, text: todo.text});
    }

    const finishEdit = (text: string) => {
        todoListStore.editTodo(edit.id, text, location);
        setEdit({ id: "", text: "" });
    }

    return (
       <div className={todo.isComplete ? "todo-row complete" : "todo-row"}>
           <div className="todo-inputs">
               <input type="checkbox" className="todo-checkbox"
                      checked={!!todo.isComplete}
                      onChange={() =>
                          todoListStore.completeTodo(todo.id, location)
                      }
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
           <div className="todo-parent">
               { todo.parent !== "/"
                  ? sidebarStore.getValue(todo.parent as string)
                  : null}
           </div>
           <div className="icons">
               <RiEdit2Line
                  onClick={() => startEdit()}
                  className="edit-icon"
               />
               <RiCloseLine
                  onClick={() => todoListStore.removeTodo(
                     todo.id,
                     location
                  )}
                  className="delete-icon"
               />
           </div>
       </div>
    );
}

export default observer(Todo);
export type {ITodo};