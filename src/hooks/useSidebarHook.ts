import { useLocation, useNavigate } from 'react-router-dom';
import modalStore from '../stores/modalStore';
import sidebarStore from '../stores/sidebarStore';
import todoListStore from '../stores/todoListStore';

const useSidebarHook = () => {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const showModal = () => {
        modalStore.header = 'Add sidebar item';
        modalStore.handleSubmit = handleModalSubmit;
        navigate('add');
    };

    const handleModalSubmit = (text: string) => {
        const path = sidebarStore.addItem(text.trim());
        navigate('/lists/' + path);
    };

    const handleRemove = (path: string) => {
        sidebarStore.removeItem(path);
        todoListStore.removeTodos('/lists/' + path);
        navigate('/lists/home');
    };

    return { location, navigate, showModal, handleRemove };
};

export default useSidebarHook;
