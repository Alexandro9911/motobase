import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
    Link,
} from "react-router-dom";
import FormLogin from "./FormLogin";

function Login() {
    return (
        <Loginpannel/>
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
                            <Link to="/registration" className="btn-sm btn-outline-primary">Зарегистрироваться</Link>
                            <Link to="/foggotpassw" className='btn-sm btn-outline-primary'>Восстановление пароля</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;