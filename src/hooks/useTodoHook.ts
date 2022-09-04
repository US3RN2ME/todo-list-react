import { useState } from 'react';
import todoListStore, { ITodo } from '../stores/todoListStore';
import { useLocation } from 'react-router-dom';
import { ITodoProps } from '../components/Todo/Todo';

const useTodoHook = ({ todo }: ITodoProps) => {
    const [input, setInput] = useState(todo.text);
    const [edit, setEdit] = useState<ITodo>({ id: '', text: '' });
    let location = useLocation().pathname;
    if (todo.parent) {
        location = todo.parent;
    }

    const startEdit = () => {
        if (todo.isComplete) return;
        setEdit({ id: todo.id, text: todo.text });
    };

    const finishEdit = (text: string) => {
        todoListStore.editTodo(edit.id, text, location);
        setEdit({ id: '', text: '' });
    };

    return { input, setInput, edit, setEdit, location, startEdit, finishEdit };
};

export default useTodoHook;
