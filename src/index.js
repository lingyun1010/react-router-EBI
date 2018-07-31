import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './EBIApp';
import {BrowserRouter as Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import HeatmapShowcase from './HeatmapShowcase-dropbox'

ReactDOM.render(<Router><App  /></Router>, document.getElementById('root'));
//registerServiceWorker();
