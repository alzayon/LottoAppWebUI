require('toastr/toastr.scss');
require('./main.scss');

//Redux related
import { Provider } from 'react-redux'
import configureStore from './redux/store.js';
import initialState from './redux/initial_state.js'

//React related
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App.jsx';

import ConfigService from './services/general/ConfigService.js';
import MapperService from './services/general/MapperService.js';
import EntryService2 from './services/api/EntryService2.js';

//https://github.com/callemall/material-ui/issues/4670
injectTapEventPlugin();

const store = configureStore(initialState);

const configService = new ConfigService();
const mapperService = new MapperService();
const entryService = new EntryService2(configService, mapperService);

render(
    <Provider store={store}>
        <App entryService={entryService} />
    </Provider>,
document.getElementById('react-container'));
