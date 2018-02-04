import React from 'react';

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

import * as mui from 'material-ui';
import { Route, HashRouter } from 'react-router-dom';


import Home from './pages/Home.jsx';
import AddEntry from './pages/AddEntry.jsx';
import EditEntry from './pages/EditEntry.jsx';
import ListEntries from './pages/ListEntries.jsx';
import ListWinningEntries from './pages/ListWinningEntries.jsx';
import GenerateLuckyPick from './pages/GenerateLuckyPick.jsx';

import EntryService from '../services/api/EntryService.js';

import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'



const muiTheme = getMuiTheme({
    palette: {
    accent1Color: deepOrange500,
  },
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.entryService = props.entryService;
    }

    static get childContextTypes() {
        return { muiTheme: PropTypes.object };
    }

    componentWillMount() {
        this.setState({
            open: false
        })
    }

    getChildContext(){
      return {
        muiTheme: muiTheme
      };
    }

    toggleDrawer = () => this.setState({ open: !this.state.open })

    render() {
        return (
            <div>

                <div>
                    {/*
                        https://teamtreehouse.com/community/reactrouter-hashrouter-does-not-work-with-2-routes
                        https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
                    */}
                    <HashRouter>
                        <div>

                            {/* https://daxchen.github.io/material-ui-Link-within-MenuItem/#/about */}
                            <AppBar
                                title="Lotto App React Home"
                                iconClassNameRight="muidocs-icon-navigation-expand-more"
                                onLeftIconButtonTouchTap={this.toggleDrawer}
                            />

                            <Drawer
                                docked={false}
                                width={300}
                                onRequestChange={this.toggleDrawer}
                                open={this.state.open}
                                >
                                    <AppBar title="Title" onLeftIconButtonTouchTap={this.toggleDrawer} />
                                    <MenuItem
                                        primaryText="Home"
                                        containerElement={<Link to="/" />}
                                        onTouchTap={() => {
                                            this.toggleDrawer()
                                        }}
                                    />
                                    <MenuItem
                                        primaryText="List Entries"
                                        containerElement={<Link to="/list-entries" />}
                                        onTouchTap={() => {
                                            this.toggleDrawer()
                                        }}
                                    />
                                    <MenuItem
                                        primaryText="List Winning Entries"
                                        containerElement={<Link to="/list-winning-entries" />}
                                        onTouchTap={() => {
                                            this.toggleDrawer()
                                        }}
                                    />
                                    <MenuItem
                                        primaryText="Add Entry"
                                        containerElement={<Link to="/add-entry" />}
                                        onTouchTap={() => {
                                            this.toggleDrawer()
                                        }}
                                    />
                                    <MenuItem
                                        primaryText="Generate"
                                        containerElement={<Link to="/generate-lucky-pick" />}
                                        onTouchTap={() => {
                                            this.toggleDrawer()
                                        }}
                                    />
                                </Drawer>

                            <div className="container">
                                <Route exact path="/"
                                    component={Home}/>

                                {/* https://github.com/ReactTraining/react-router/issues/4105 */}
                                <Route path="/add-entry"
                                    render={routeProps => <AddEntry {...routeProps}
                                                                entryService={this.entryService}/>
                                           }
                                />
                                <Route path="/list-entries"
                                    render={routeProps => <ListEntries {...routeProps}
                                                                entryService={this.entryService}/>
                                    }
                                />
                                <Route path="/list-winning-entries"
                                    render={routeProps => <ListWinningEntries {...routeProps}
                                                                entryService={this.entryService}/>
                                    }
                                />
                                <Route path="/edit-entry/:id"
                                    render={routeProps => <EditEntry {...routeProps}
                                                                entryService={this.entryService}/>
                                    }
                                />
                                <Route path="/generate-lucky-pick"
                                    render={routeProps => <GenerateLuckyPick {...routeProps}/>}
                                />
                            </div>
                        </div>
                    </HashRouter>
                </div>

            </div>
        );//End of return ()
    }
}

App.propTypes = {
  entryService: PropTypes.object.isRequired
};

export default App;
