import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',

        };
    }

    render() {
        let fio = window.sessionStorage.getItem('fio');
        let tel = window.sessionStorage.getItem('teleph');
        let email = window.sessionStorage.getItem('email');
        return (
            <div className='container'>
                <h5>Настройки учетной записи</h5>
                <div className='dropdown-divider'/>
                <div className='wrapper7'>
                    <h6>Имя Фамилия Отчество: {fio}</h6>
                    <h6>Контактный телефон: {tel}</h6>
                    <h6>Электронная почта: {email}</h6>
                    <div className='dropdown-divider'/>
                    <h6>Смена пароля</h6>
                    <form>

                    </form>
                </div>
            </div>
        );
    }
}

export default Settings;