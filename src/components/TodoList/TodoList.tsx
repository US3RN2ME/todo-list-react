import React, {useState} from 'react';
import TodoForm from "../TodoForm/TodoForm";
import Todo, {ITodo} from "../Todo/Todo";
import "./TodoList.css"

const TodoList = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    const isValid = (todo: ITodo) =>
        todo.text && !/^\s*$/.test(todo.text);

    const addTodo = (todo: ITodo) => {
        if(!isValid(todo)) return;
        setTodos(todos => [todo, ...todos]);
    }

    const removeTodo = (todo: ITodo) => {
        setTodos(todos =>
            todos.filter(value => value.id !== todo.id));
    }

    const editTodo = (todo: ITodo, text: string) => {
        if(!isValid(todo)) return;
        setTodos(todos => todos.map(value =>
            value.id === todo.id
                ? {id: value.id, text}
                : value
        ));
    }

    const completeTodo = (todo: ITodo) => {
        const updatedTodos = [...todos];
        for (const value of updatedTodos) {
            if(value.id === todo.id) {
                value.isComplete = !value.isComplete;
                break;
            }
        }
        setTodos(updatedTodos);
    }

    const getDate = () => {
        const date = new Date();
        const weekday = date.toLocaleDateString(
            "en-US",
            { weekday: 'long'}
        );
        const month = date.toLocaleDateString(
            "en-US",
            { month: 'short'}
        );
        return `It's ${weekday}, ${month} ${date.getDate()}`
    }

    return (
        <div className="todo-app">
            <h1 className="todo-list-header">
                <div className="todo-list-name">Good morning</div>
                <div className="todo-list-date">{getDate()}</div>
            </h1>
            <TodoForm onSubmit={addTodo}/>
            <div className="todo-list">
                {todos.map(value => (
                    <Todo
                        key={value.id}
                        todo={value}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                        editTodo={editTodo}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
