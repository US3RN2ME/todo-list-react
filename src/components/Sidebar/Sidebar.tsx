import React from 'react';
import {observer} from "mobx-react";
import {Link, useLocation} from "react-router-dom";
import sidebarStore, {ISidebarItem} from "../../stores/sidebarStore";
import "./Sidebar.css"

const Sidebar = () => {
    const location = useLocation().pathname;
    return (
        <div className="sidebar">
            {sidebarStore.getItems().map((item: ISidebarItem) => (
                <Link key={item.path} to={item.path}
                      className={location === item.path
                          ? "sidebar-item selected"
                          : "sidebar-item" }>
                    {item.title}
                </Link>

            ))}
            <div className="sidebar-item sidebar-add">
                <div>Create new list</div>
            </div>
        </div>
    );
};

export default observer(Sidebar);
