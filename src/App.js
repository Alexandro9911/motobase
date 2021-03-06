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
import Userpage from "./userpage";
import Saves from "./saves";
import Mygarage from "./mygarage";
import Store from "./store";
import Settings from "./settings";
import MyOffers from "./myOffers";
import FoggotPassw from "./foggotPasswPage";

export default function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/userpage">
                        <Userpage/>
                    </Route>
                    <Route path='/userpage/saves'>
                        <Saves/>
                    </Route>
                    <Route path='/userpage/myoffers'>
                        <MyOffers/>
                    </Route>
                    <Route path='/userpage/mygarage'>
                        <Mygarage/>
                    </Route>
                    <Route path='/userpage/store'>
                        <Store/>
                    </Route>
                    <Route path='/userpage/settings'>
                        <Settings/>
                    </Route>
                    <Route path="/loginpage">
                        <Login/>
                    </Route>
                    <Route path="/foggotpassw">
                        <FoggotPassw/>
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

