import React from 'react';
import {observer} from "mobx-react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import modalStore from '../../stores/modalStore'
import sidebarStore, {ISidebarItem} from "../../stores/sidebarStore";
import "./Sidebar.css"
import { AiOutlineClose } from 'react-icons/ai'
import todoListStore from '../../stores/todoListStore'


const Sidebar = () => {
   const location = useLocation().pathname;
   const navigate = useNavigate();

   const handleModalSubmit = (text: string) => {
      const path = sidebarStore.addItem(text.trim());
      navigate(path);
   }

   const handleRemove = (path: string) => {
      navigate("/");
      sidebarStore.removeItem(path);
      todoListStore.removeTodos(path);
   }

   return (
      <div className="sidebar">
         {sidebarStore.getItems().map((item: ISidebarItem) => (
            <Link key={item.path} to={item.path}
                  className={location === item.path
                     ? "sidebar-item selected"
                     : "sidebar-item" }>
               <div className="sidebar-item-text">
                  {item.title}
               </div>
               {item.path !== "/"
                  ? <AiOutlineClose className="sidebar-item-remove"
                                    onClick={e => {
                                       e.preventDefault();
                                       handleRemove(item.path);
                                    }}
                  />
                  : null
               }
            </Link>
         ))}
         <div className="sidebar-item sidebar-add"
              onClick={() =>
                 modalStore.show(
                    "Add a task list",
                    handleModalSubmit)}>
            Create new list
         </div>
      </div>
   );
};

export default observer(Sidebar);
