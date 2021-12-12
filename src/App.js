import React from 'react';
import {HashRouter as Router,Route,Switch } from "react-router-dom"
import './App.css';
import HomePage from './pages/HomePage';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div >
        <Router>
            <Switch>
              <Route exact path="/" render={props=> <HomePage {...props}/>}/>
              <Route exact path="/favorites" render={props => <Favorites {...props}/>}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
