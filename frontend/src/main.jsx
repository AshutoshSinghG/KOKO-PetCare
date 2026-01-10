import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './components/HomePage';
import ChatWidget from './components/ChatWidget';
import './styles/widget.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HomePage />
        <ChatWidget />
    </React.StrictMode>
);
