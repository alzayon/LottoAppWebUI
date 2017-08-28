require('./main.scss');

import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';
import App from  './components/App.jsx';

//https://github.com/callemall/material-ui/issues/4670
injectTapEventPlugin();

render(
	<App/>,
	document.getElementById('react-container'));
