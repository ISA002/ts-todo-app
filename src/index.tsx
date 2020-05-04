import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './components/Application/Application';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'

ReactDOM.render(<Application />, document.getElementById('root'));
serviceWorker.unregister();
