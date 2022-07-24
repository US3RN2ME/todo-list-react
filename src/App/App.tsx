import React from 'react';
import "./App.css";
import TodoList from "../components/TodoList/TodoList";
import Sidebar from "../components/Sidebar/Sidebar";
import sidebarStore  from "../stores/sidebarStore";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import { observer } from 'mobx-react'
import Modal from '../components/Modal/Modal'


const App = () => (
   <BrowserRouter>
      <Modal/>
      <div className="app">
         <Sidebar/>
         <Routes>
            {sidebarStore.getItems().map(item =>
               <Route key={item.path} path={item.path}
                      element={<TodoList title={item.title}/>}
               />
            )}
         </Routes>
      </div>
   </BrowserRouter>
);

export default observer(App);