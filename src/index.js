import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { TaskContextProvider } from './context/TaskContext';
import { AuthContextProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <TaskContextProvider>
                <App />
            </TaskContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);