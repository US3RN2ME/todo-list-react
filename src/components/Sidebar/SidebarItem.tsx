import { toRoute } from '../../functions/routes';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import React, { FC } from 'react';
import todoListController from '../../stores/todoListController';
import { observer } from 'mobx-react';

interface SidebarItemProps {
    todoListId: string;
    todoListName: string;
    path: string;
    selectedId: string;
    setSelectedId: (value: string) => void;
    removable: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
    todoListId,
    todoListName,
    path,
    selectedId,
    setSelectedId,
    removable,
}) => {
    const navigate = useNavigate();

    const handleRemove = async (id: string) => {
        await todoListController.deleteList(id);
        navigate('/lists/home');
    };

    const handleClick = () => {
        setSelectedId(todoListId);
        navigate(toRoute(path));
    };

    return (
        <div
            className={
                selectedId === todoListId
                    ? 'sidebar-item selected'
                    : 'sidebar-item'
            }
            onClick={() => handleClick()}
        >
            <div className="sidebar-item-text">{todoListName}</div>
            {removable && (
                <AiOutlineClose
                    className="sidebar-item-remove"
                    onClick={async () => {
                        await handleRemove(todoListId);
                    }}
                />
            )}
        </div>
    );
};

export default observer(SidebarItem);
