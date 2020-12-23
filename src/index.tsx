import React from 'react';
import ReactDOM from 'react-dom';
import AppWrap from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('WarStatsApp');
if(rootElement.hasChildNodes()) {
    ReactDOM.hydrate(<Router basename="/"><AppWrap /></Router>, rootElement);
} else {
    ReactDOM.render(<Router basename="/"><AppWrap /></Router>, rootElement);
}