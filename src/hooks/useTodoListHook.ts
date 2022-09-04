import { useLocation } from 'react-router-dom';
import todoListStore from '../stores/todoListStore';

const useTodoListHook = () => {
    const location = useLocation().pathname;

    const handleSubmit = (text: string) => {
        todoListStore.addTodo(text.trim(), location);
    };

    return { location, handleSubmit };
};

export default useTodoListHook;
