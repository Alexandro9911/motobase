import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

import './App.css'

function Navbar() {
    return(
        <div>
            <nav className="navbarbyme">
                <div className="flex-container">
                    <div className='flex-item'>
                        <img src={require('./images/icon_helmet.png')}/>
                    </div>
                    <div className='flex-item'>
                        <h3>Motobase</h3>
                    </div>
                    <div className='flex-item'>
                        <Link to="/">
                        <button className='btn btn-light'>
                           Главная
                        </button>
                        </Link>
                    </div>
                    <div className='flex-item'>
                        <Link to="/loginpage">
                        <button className='btn btn-light'>
                            Вход
                        </button>
                        </Link>
                    </div>
                    <div className='flex-item'>
                        <Link to="/registration">
                        <button className='btn btn-light'>
                            Регистрация
                        </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default Navbar;
