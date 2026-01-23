import React, { StrictMode } from 'react';
import { HashRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './components/app/App'
import MarvelService from './services/MarvelService';
import "./style/style.scss";


const marvelService = new MarvelService();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);
