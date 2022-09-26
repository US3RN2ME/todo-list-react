import React, { FC, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { RiEdit2Line } from 'react-icons/ri';
import { observer } from 'mobx-react';
import './Todo.css';
import { TodoDto } from '../../generated-api';
import todoListController from '../../stores/todoListController';
import { useNavigate } from 'react-router-dom';

export interface TodoProps {
    todo: TodoDto;
    showParent: boolean;
}

const Todo: FC<TodoProps> = ({ todo, showParent }) => {
    const [input, setInput] = useState(todo.name);
    const [editId, setEditId] = useState('');
    const navigate = useNavigate();

    const parentName = todoListController.getListById(todo.todoListId).name;

    const startEdit = () => {
        if (todo.isComplete) return;
        setEditId(todo.id);
    };

    const finishEdit = async (text: string) => {
        await todoListController.updateTodo(editId, text);
        setEditId('');
    };

    return (
        <div className={todo.isComplete ? 'todo-row complete-row' : 'todo-row'}>
            <div className="todo-inputs">
                <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.isComplete}
                    onChange={() => todoListController.completeTodo(todo.id)}
                />
                <input
                    disabled={!editId}
                    type="text"
                    className={
                        todo.isComplete
                            ? 'todo-edit complete-text'
                            : 'todo-edit'
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onBlur={() => finishEdit(input)}
                    onKeyDown={async (e) => {
                        if (e.key === 'Enter') await finishEdit(input);
                    }}
                />
            </div>
            {showParent && (
                <div
                    className="todo-parent"
                    onClick={() => navigate('/lists/' + parentName)}
                >
                    {parentName}
                </div>
            )}
            <div className="icons">
                <RiEdit2Line
                    onClick={() => startEdit()}
                    className="edit-icon"
                />
                <RiCloseLine
                    onClick={async () =>
                        await todoListController.deleteTodo(todo.id)
                    }
                    className="delete-icon"
                />
            </div>
        </div>
    );
};

export default observer(Todo);
