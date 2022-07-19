import React, {useState} from 'react';
import TodoForm from "./TodoForm";
import Todo, {ITodo} from "./Todo";

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
        setTodos(todos => todos.map(value => {
            if(value.id === todo.id) {
                value.isComplete = !value.isComplete;
            }
            return value;
        }));
    }

    return (
        <div className="todo-list">
            <h1 className="todo-list-header">
                What's the plan for today?
            </h1>
            <TodoForm onSubmit={addTodo}/>
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
    );
};

export default TodoList;
