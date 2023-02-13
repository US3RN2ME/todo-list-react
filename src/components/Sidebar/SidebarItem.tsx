import { toRoute } from '../../functions/routes';
import { AiOutlineClose } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { FC } from 'react';
import todoListController from '../../stores/todoListController';
import { observer } from 'mobx-react';
import './Sidebar.css';

interface SidebarItemProps {
    todoListId: string;
    todoListName: string;
    path: string;
    removable: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
    todoListId,
    todoListName,
    path,
    removable,
}) => {
    const navigate = useNavigate();

    return (
        <NavLink
            to={toRoute(path)}
            className={({ isActive }) =>
                isActive ? 'sidebar-item selected' : 'sidebar-item'
            }
        >
            <div className="sidebar-item-text">{todoListName}</div>
            {removable && (
                <AiOutlineClose
                    className="sidebar-item-remove"
                    onClick={async () => {
                        await todoListController.deleteList(todoListId);
                        navigate('/lists/home');
                    }}
                />
            )}
        </NavLink>
    );
};

export default observer(SidebarItem);
