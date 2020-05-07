import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Userpage from "./userpage";
import About from "./mainpage";
import Login from "./loginpage";
import Registrationform from "./Registrationform";


let DB = openDatabase("postgres","1.0","Motobase", 2000000);

function Registration() {
    return (
        <Router>
            <Switch>
                <Route path="/registration">
                    <Registrationpannel/>
                </Route>
                <Route path="/userpage">
                    <Userpage/>
                </Route>
                <Route path="/loginpage">
                    <Login/>
                </Route>
                <Route path="/">
                    <About/>
                </Route>
            </Switch>
        </Router>
    );
}

function Registrationpannel() {
    return (
        <div className="smoothback">
            <div className="container">
                <div className="wrapper">
                    <div className="myCard">
                        <div className="container">
                            <h4>Регистрация</h4>
                            <Registrationform/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
//
// function checkDBconnection() {
//     if (!DB) {
//         alert("No db Connection");
//     }
// }
//
// function getValues() {
//     let fio = document.getElementById("fio");
//     alert("data: "+ fio);
// }
//
// function registry() {
//     let button = document.getElementById("adduser");
//     button.addEventListener("click",this);
//
// }

export default Registration;