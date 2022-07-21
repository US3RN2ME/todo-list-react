import React from 'react';
import "./App.css";
import TodoList from "../components/TodoList/TodoList";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => (
    <ThemeProvider theme={darkTheme}>
        <TodoList/>
    </ThemeProvider>
);

export default App;