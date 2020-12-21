import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('WarStatsApp');
if(rootElement.hasChildNodes()) {
    ReactDOM.hydrate(<Router basename="/"><App kd="" /></Router>, rootElement);
} else {
    ReactDOM.render(<Router basename="/"><App kd="" /></Router>, rootElement);
}