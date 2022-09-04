import React, { FC } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { RiEdit2Line } from 'react-icons/ri';
import { observer } from 'mobx-react';
import todoListStore, { ITodo } from '../../stores/todoListStore';
import './Todo.css';
import sidebarStore from '../../stores/sidebarStore';
import useTodoHook from '../../hooks/useTodoHook';

export interface ITodoProps {
    todo: ITodo;
}

const Todo: FC<ITodoProps> = ({ todo }) => {
    const { input, setInput, edit, setEdit, location, startEdit, finishEdit } =
        useTodoHook({ todo });

    return (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'}>
            <div className="todo-inputs">
                <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={!!todo.isComplete}
                    onChange={() =>
                        todoListStore.completeTodo(todo.id, location)
                    }
                />
                <input
                    disabled={!edit.id}
                    type="text"
                    className="todo-edit"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onBlur={() => finishEdit(input)}
                    onKeyDownCapture={(e) => {
                        if (e.key === 'Enter') finishEdit(input);
                    }}
                />
            </div>
            <div className="todo-parent">
                {todo.parent !== '/'
                    ? sidebarStore.getValue(todo.parent as string)
                    : null}
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
};

export default observer(Todo);
