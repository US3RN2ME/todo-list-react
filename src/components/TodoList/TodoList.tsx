import React, {FC} from 'react';
import {observer} from "mobx-react";
import {useLocation} from "react-router-dom";
import Todo from "../Todo/Todo";
import TodoForm from "../TodoForm/TodoForm";
import todoListStore, {ITodo} from "../../stores/todoListStore";
import {getDate, getMonth, getTimeOfDay, getWeekday} from "../../functions/getDate";
import "./TodoList.css"

interface ITodoListProps {
    title: string;
}

const TodoList: FC<ITodoListProps> = ({title}) => {
        const location = useLocation().pathname;
        return (
           <div className="todo-app">
              <h1 className="todo-list-header">
                 {location === "/" ?
                    <>
                       <div className="todo-list-name">
                          Good {getTimeOfDay()}
                       </div>
                       <div className="todo-list-date">
                          It's {getWeekday()}, {getMonth()} {getDate()}
                       </div>
                    </>
                    : <div className="todo-list-name">{title}</div>
                 }
              </h1>
              <TodoForm/>
              <div className="todo-list">
                 {(location === "/"
                    ? todoListStore.getAllTodos()
                    : todoListStore.getTodos(location))
                    .map((value: ITodo) => (
                       <Todo key={value.id}
                             todo={value}
                       />
                    ))}
              </div>
           </div>
        );

}


export default observer(TodoList);
