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
      navigate("/lists/" + path);
   }

   const handleRemove = (path: string) => {
      sidebarStore.removeItem(path);
      todoListStore.removeTodos("/lists/" + path);
      navigate("/lists/home");
   }

   return (
      <div className="sidebar" onClick={e => e.detail == 2 &&
         e.target === e.currentTarget && navigate("/lists")}
      >
         {sidebarStore.getItems().map((item: ISidebarItem) => (
            <Link key={item.path} to={item.path}
                  className={location === "/lists/" + item.path
                     ? "sidebar-item selected"
                     : "sidebar-item" }>
               <div className="sidebar-item-text">
                  {item.title}
               </div>
               {item.path !== "home" &&
                  <AiOutlineClose className="sidebar-item-remove"
                                    onClick={e => {
                                       e.preventDefault();
                                       handleRemove(item.path);
                                    }}
                  />
               }
            </Link>
         ))}
         <Link to="add" className="sidebar-item sidebar-add"
              onClick={() => modalStore.show(
                    "Add a task list",
                    handleModalSubmit)}
         >Create new list
         </Link>
      </div>
   );
};

export default observer(Sidebar);
