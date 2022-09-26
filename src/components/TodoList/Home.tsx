import React from 'react';
import todoListController from '../../stores/todoListController';
import {
    getDate,
    getMonth,
    getTimeOfDay,
    getWeekday,
} from '../../functions/getDate';
import Todo from '../Todo/Todo';
import { observer } from 'mobx-react';

const Home = () => {
    return (
        <div className="todo-app">
            <h1 className="todo-list-header">
                <div className="todo-list-name">Good {getTimeOfDay()}</div>
                <div className="todo-list-date">
                    It is {getWeekday()}, {getMonth()} {getDate()}
                </div>
            </h1>

            <div className="todo-list">
                {todoListController
                    .getAllTodos()
                    .sort(
                        (a, b) =>
                            Date.parse(a.createdAt) - Date.parse(b.createdAt)
                    )
                    .map((value) => (
                        <Todo key={value.id} todo={value} showParent={true} />
                    ))}
            </div>
        </div>
    );
};

export default observer(Home);
