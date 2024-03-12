import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Board from './pages/board';
import Home from './pages/home';
import Error from './pages/error';
import { DataProvider } from './state/dataProvider';


// Import your components here
const App = () => {
    useEffect(() => {
        console.log('DataProvider', DataProvider);
    }, []);
    return (
        <HashRouter>
            <DataProvider>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/board/:id" element={<Board />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </DataProvider>
        </HashRouter>
    );
};

const root = document.getElementById('trello-board');
ReactDOM.createRoot(root).render(<App />);



