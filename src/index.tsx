import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from "./LoginPage";
import * as serviceWorker from './serviceWorker';
import App from "./App";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

let routes = (
    <div>
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/app" component={App}/>
                <Redirect to="/app"/>
            </Switch>
        </Router>
    </div>
);

ReactDOM.render(routes, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
