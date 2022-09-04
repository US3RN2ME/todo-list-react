import React from 'react';
import './App.css';
import TodoList from '../components/TodoList/TodoList';
import Sidebar from '../components/Sidebar/Sidebar';
import sidebarStore from '../stores/sidebarStore';
import {
    Routes,
    Route,
    BrowserRouter,
    Navigate,
    Outlet,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import Modal from '../components/Modal/Modal';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/LoginForm/RegisterForm';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />
                    <Route
                        path="lists"
                        element={
                            <>
                                <Sidebar />
                                <Outlet />
                            </>
                        }
                    >
                        {sidebarStore.getItems().map((item) => (
                            <Route
                                key={item.path}
                                path={item.path}
                                element={<TodoList title={item.title} />}
                            />
                        ))}
                        <Route key="modal" path="add" element={<Modal />} />
                    </Route>
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                    <Route
                        path="*"
                        element={<Navigate replace to="/lists" />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default observer(App);
