import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Todo from '../Todo/Todo';
import InputForm from '../InputForm/InputForm';
import todoListStore, { ITodo } from '../../stores/todoListStore';
import {
    getDate,
    getMonth,
    getTimeOfDay,
    getWeekday,
} from '../../functions/getDate';
import './TodoList.css';
import useTodoListHook from '../../hooks/useTodoListHook';

interface ITodoListProps {
    title: string;
}

const TodoList: FC<ITodoListProps> = ({ title }) => {
    const { location, handleSubmit } = useTodoListHook();

    return (
        <div className="todo-app">
            <h1 className="todo-list-header">
                {location === '/lists/home' ? (
                    <>
                        <div className="todo-list-name">
                            Good {getTimeOfDay()}
                        </div>
                        <div className="todo-list-date">
                            It's {getWeekday()}, {getMonth()} {getDate()}
                        </div>
                    </>
                ) : (
                    <div className="todo-list-name">{title}</div>
                )}
            </h1>

            {location !== '/lists/home' && (
                <InputForm handleSubmit={handleSubmit} />
            )}

            <div className="todo-list">
                {(location === '/lists/home'
                    ? todoListStore.getAllTodos()
                    : todoListStore.getTodos(location)
                ).map((value: ITodo) => (
                    <Todo key={value.id} todo={value} />
                ))}
            </div>
        </div>
    );
};

export default observer(TodoList);
