import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Board from './pages/board';
import Home from './pages/home';
import Error from './pages/error';

// Import your components here
const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/board/:id" element={<Board />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </HashRouter>
    );
};

const root = document.getElementById('trello-board');
ReactDOM.createRoot(root).render(<App />);