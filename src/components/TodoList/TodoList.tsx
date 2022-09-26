import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Todo from '../Todo/Todo';
import InputForm from '../InputForm/InputForm';
import './TodoList.css';
import { TodoListDto } from '../../generated-api';
import todoListController from '../../stores/todoListController';

interface TodoListProps {
    todoList: TodoListDto;
}

const TodoList: FC<TodoListProps> = ({ todoList }) => {
    const handleSubmit = async (text: string) => {
        await todoListController.addTodo(todoList.id, text.trim());
    };

    return (
        <div className="todo-app">
            <h1 className="todo-list-header">
                <div className="todo-list-name">{todoList.name}</div>
            </h1>

            <InputForm handleClick={handleSubmit} />

            <div className="todo-list">
                {todoList.todos
                    .slice()
                    .sort(
                        (a, b) =>
                            Date.parse(a.createdAt) - Date.parse(b.createdAt)
                    )
                    .map((value) => (
                        <Todo key={value.id} todo={value} showParent={false} />
                    ))}
            </div>
        </div>
    );
};

export default observer(TodoList);
