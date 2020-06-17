"use strict";
import React, {Component} from "react";

class Registrationform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fio: '',
            email: '',
            country: '',
            city: '',
            telephone: '',
            passw: '',
            reppasw: '',
            done: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFioChange = this.handleFioChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleTelephChange = this.handleTelephChange.bind(this);
        this.handlePasswChange = this.handlePasswChange.bind(this);
        this.handlePasswRepChange = this.handlePasswRepChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        let user = {
            userFio: this.state.fio,
            userEmail: this.state.email,
            userCountry: this.state.country,
            usecCity: this.state.city,
            userTeleph: this.state.telephone,
            userPassw: this.state.passw
        };
        if(this.state.passw === this.state.reppasw) {
            // добавить валидацию пароля
            let answ = '';
            // вносим пользователя
            let resp = await window.fetch("http://localhost/motobase/addToDB.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: new URLSearchParams({
                    fio: user.userFio,
                    email: user.userEmail,
                    country: user.userCountry,
                    city: user.usecCity,
                    tel: user.userTeleph,
                    passw: user.userPassw
                })
            })
                .then(response => response.text())
                .then(result => answ = result);
            if (answ === 'success') {
                alert("вы зарегистрированы");
                window.location.assign('/loginpage');
            } else {
                if (answ === "userExist") {
                    alert("Пользователь уже существует");
                } else {
                    alert("err: " + answ);
                }
            }
        } else {
            alert("Пароли не совпадают");
        }
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleFioChange(event) {
        this.setState({fio: event.target.value});
    }

    handleCountryChange(event) {
        this.setState({country: event.target.value});
    }

    handleCityChange(event) {
        this.setState({city: event.target.value});
    }

    handleTelephChange(event) {
        this.setState({telephone: event.target.value});
    }

    handlePasswChange(event) {
        this.setState({passw: event.target.value});
    }

    handlePasswRepChange(event) {
        this.setState({reppasw: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className='wrapper2'>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">ФИО</label>
                            <div className="col-sm-10">
                                <input
                                    type="text" className="form-control" id="fio" placeholder="Фамилия Имя Отчество"
                                    required={true}
                                    value={this.state.fio}
                                    onChange={this.handleFioChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Страна</label>
                            <div className="col-sm-10">
                                <select className="custom-select" id="inlineFormCustomSelectPref"
                                        required={true}
                                        value={this.state.country}
                                        onChange={this.handleCountryChange}>
                                    <option selected>Choose...</option>
                                    <option value="1">Россия</option>
                                    <option value="2">Украина</option>
                                    <option value="3">Япония</option>
                                    <option value="4">Германия</option>
                                    <option value="5">Австрия</option>
                                    <option value="6">Китай</option>
                                    <option value="7">США</option>
                                    <option value="8">Индия</option>
                                    <option value="9">Республика Беларусь</option>
                                    <option value="10">Финляндия</option>
                                    <option value="11">Корея</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Город</label>
                            <div className="col-sm-10">
                                <select className="custom-select" id="inlineFormCustomSelectPref"
                                        required={true}
                                        value={this.state.city}
                                        onChange={this.handleCityChange}>
                                    <option selected>Choose...</option>
                                    <option value="1">Санкт-Петербург</option>
                                    <option value="2">Москва</option>
                                    <option value="3">Ростов</option>
                                    <option value="4">Тосно</option>
                                    <option value="5">Магадан</option>
                                    <option value="6">Великий Новгород</option>
                                    <option value="7">Berlin</option>
                                    <option value="8">Muenchen</option>
                                    <option value="9">Frankfurt am Main</option>
                                    <option value="10">Киев</option>
                                    <option value="11">New York</option>
                                    <option value="12">Las Vegas</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Телефон</label>
                            <div className="col-sm-10">
                                <input
                                    type="text" className="form-control" id="tel"
                                    placeholder="добавьте мобильный телефон" required={true}
                                    value={this.state.telephone}
                                    onChange={this.handleTelephChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Эл. почта</label>
                            <div className="col-sm-10">
                                <input
                                    type="email" className="form-control" id="email" placeholder="Email"
                                    required={true}
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Пароль</label>
                            <div className="col-sm-10">
                                <input
                                    type="password" className="form-control" id="passw" placeholder="Придумайте пароль"
                                    required={true}
                                    value={this.state.passw}
                                    onChange={this.handlePasswChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Подтвердите пароль</label>
                            <div className="col-sm-10">
                                <input
                                    type="password" className="form-control" id="passwrepeat"
                                    placeholder="Повторите пароль" required={true}
                                    value={this.state.reppasw}
                                    onChange={this.handlePasswRepChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper2">
                    <button className="btn btn-light">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        );
    }
}

export default Registrationform;