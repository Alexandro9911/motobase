import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import UserInfo from "./userinfo";
import UserNavs from "./usernavs";
import {
    BrowserRouter as Router,
    Link,
    useRouteMatch,
    useParams,
    Switch,
    Route } from "react-router-dom";

import Saves from "./saves";
import Store from "./store";
import Mygarage from "./mygarage";
import Settings from "./settings";
import Login from "./loginpage";
function Userpage() {
    let match = useRouteMatch();

    return (
        <div className="grid-container-user">
            <div className="mainbar">
                <UserNavs/>
            </div>
            <div>
                <Switch>
                    <Route path={`${match.url}/saves`}>
                        <Saves/>
                    </Route>
                    <Route path={`${match.url}/mygarage`}>
                        <Mygarage/>
                    </Route>
                    <Route path={`${match.url}/store`}>
                        <Store/>
                    </Route>
                    <Route path={`${match.url}/settings`}>
                        <Settings/>
                    </Route>
                    <Route path={`/loginpage`}>
                        <Login/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Userpage;