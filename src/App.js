import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/layouts/AppNavbar';
import Dashboard from './components/layouts/Dashboard';
import AddClient from './components/clients/AddClient';
import ClientDetail from './components/clients/ClientDetail';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar id="Navbar" style={{ backgroundColor: '#1E87E3' }} />
            <div className="container" style={{ paddingTop: '20px' }}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/client/add" component={AddClient} />
                <Route exact path="/client/:id" component={ClientDetail} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
