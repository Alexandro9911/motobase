import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import Userpage from "./userpage";
import Registration from "./registrationpage";
import About from "./mainpage";
import FormLogin from "./FormLogin";

function Login() {
    return (
        <Router>
            <Switch>
                <Route path="/userpage">
                    <Userpage/>
                </Route>
                <Route path="/registration">
                    <Registration/>
                </Route>
                <Route path="/loginpage">
                    <Loginpannel/>
                </Route>
                <Route path="/">
                    <About/>
                </Route>
            </Switch>
        </Router>
    );
}

function Loginpannel() {
    return (
        <div className="smoothback">
            <div className="container">
                <div className="wrapper">
                    <div className="myCard">
                        <div className="container">
                            <h4>Авторизируйтесь</h4>
                            <FormLogin/>
                            <h6>Еще не зарегистрированы?</h6>
                            <Link to="/registration">Зарегистрироваться</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;