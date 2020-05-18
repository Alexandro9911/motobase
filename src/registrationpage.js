import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Registrationform from "./Registrationform";

function Registration() {
    return (
        <Registrationpannel/>
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

export default Registration;