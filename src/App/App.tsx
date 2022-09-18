import React from 'react';
import './App.css';
import TodoList from '../components/TodoList/TodoList';
import Sidebar from '../components/Sidebar/Sidebar';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import Modal from '../components/Modal/Modal';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/LoginForm/RegisterForm';
import todoListController from '../stores/todoListController';
import { toRoute } from '../functions/routes';
import Home from '../components/TodoList/Home';
import authController from '../stores/authController';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Navigate
                                replace
                                to={
                                    authController.isLoggedIn
                                        ? '/lists/home'
                                        : '/login'
                                }
                            />
                        }
                    />
                    <Route path="lists" element={<Sidebar />}>
                        <Route key="home" path="home" element={<Home />} />
                        {todoListController.todoLists.map((item) => (
                            <Route
                                key={item.id}
                                path={toRoute(item.name)}
                                element={<TodoList todoList={item} />}
                            />
                        ))}
                        <Route key="add" path="add" element={<Modal />} />
                    </Route>
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default observer(App);
