import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import todoListController from '../../stores/todoListController';
import SidebarItem from './SidebarItem';
import authController from '../../stores/authController';

const Sidebar = () => {
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
                    removable={false}
                />
                {todoListController.todoLists.map((item) => (
                    <SidebarItem
                        key={item.id}
                        todoListId={item.id}
                        todoListName={item.name}
                        path={item.name}
                        removable={true}
                    />
                ))}
                <SidebarItem
                    todoListId="add"
                    todoListName="Add List"
                    path="add"
                    removable={false}
                />
            </div>
            <Outlet />
        </>
    );
};

export default observer(Sidebar);
