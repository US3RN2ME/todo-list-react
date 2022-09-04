import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import sidebarStore, { ISidebarItem } from '../../stores/sidebarStore';
import './Sidebar.css';
import { AiOutlineClose } from 'react-icons/ai';
import useSidebarHook from '../../hooks/useSidebarHook';

const Sidebar = () => {
    const { location, navigate, showModal, handleRemove } = useSidebarHook();

    return (
        <div
            className="sidebar"
            onClick={(e) =>
                e.detail == 2 &&
                e.target === e.currentTarget &&
                navigate('/lists')
            }
        >
            {sidebarStore.getItems().map((item: ISidebarItem) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={
                        location === '/lists/' + item.path
                            ? 'sidebar-item selected'
                            : 'sidebar-item'
                    }
                >
                    <div className="sidebar-item-text">{item.title}</div>
                    {item.path !== 'home' && (
                        <AiOutlineClose
                            className="sidebar-item-remove"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRemove(item.path);
                            }}
                        />
                    )}
                </Link>
            ))}
            <div className="sidebar-item sidebar-add" onClick={showModal}>
                Create new list
            </div>
        </div>
    );
};

export default observer(Sidebar);
