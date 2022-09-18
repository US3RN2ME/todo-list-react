import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import todoListController from '../../stores/todoListController';
import SidebarItem from './SidebarItem';
import authController from '../../stores/authController';

const Sidebar = () => {
    const [selectedId, setSelectedId] = useState('home');
    const navigate = useNavigate();

    useEffect(() => {
        !authController.isLoggedIn && navigate('/login');
    });

    useEffect(() => {
        todoListController.updateFromDB();
    }, []);

    return (
        <>
            <div className="sidebar">
                <SidebarItem
                    todoListId="home"
                    todoListName="Home"
                    path="home"
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    removable={false}
                />
                {todoListController.todoLists.map((item) => (
                    <SidebarItem
                        key={item.id}
                        todoListId={item.id}
                        todoListName={item.name}
                        path={item.name}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        removable={true}
                    />
                ))}
                <SidebarItem
                    todoListId="add"
                    todoListName="Add List"
                    path="add"
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    removable={false}
                />
            </div>
            <Outlet />
        </>
    );
};

export default observer(Sidebar);
