import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Switch} from "react-router-dom";
import {Route} from 'react-router-dom'
import './App.css'

import Login from './loginpage'
import About from './mainpage'
import Registration from './registrationpage'
import Navbar from "./navbar";

export default function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/loginpage">
                        <Login/>
                    </Route>
                    <Route path="/registration">
                        <Registration/>
                    </Route>
                    <Route path="/">
                        <About/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

