import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: window.sessionStorage.getItem('email'),
            passw: '',
            newpassw: '',
            reppassw: '',
            fio: window.sessionStorage.getItem('fio'),
            tel: window.sessionStorage.getItem('teleph')
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFioChange = this.handleFioChange.bind(this);
        this.handleTelChange = this.handleTelChange.bind(this);

        this.handleFioSubmit = this.handleFioSubmit.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.handleTelSubmit = this.handleTelSubmit.bind(this);

        this.handlePasswChange = this.handlePasswChange.bind(this);
        this.handleNewPasswChange = this.handleNewPasswChange.bind(this);
        this.handleRepPasswChange = this.handleRepPasswChange.bind(this);

        this.handlePasswSubmit = this.handlePasswSubmit.bind(this);
    }

    handlePasswChange(event) {
        this.setState({passw: event.target.value});
    }
    handleNewPasswChange(event) {
        this.setState({newpassw: event.target.value});
    }
    handleRepPasswChange(event) {
        this.setState({reppassw: event.target.value});
    }


    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleFioChange(event) {
        this.setState({fio: event.target.value});
    }

    handleTelChange(event) {
        this.setState({tel: event.target.value});
    }

    async handlePasswSubmit(e){
        e.preventDefault();
        if(this.state.newpassw === this.state.reppassw){
            if(this.state.passw === this.state.newpassw){
                alert("Новый пароль не может совпадать со старым");
            } else {
                let answ = '';
                let resp = await window.fetch("http://localhost/motobase/changePassw.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    body: new URLSearchParams({
                        id: window.sessionStorage.getItem('id'),
                        passw: this.state.passw,
                        newpassw: this.state.newpassw
                    })
                })
                    .then(response => response.text())
                    .then(result => answ = result);
                if(answ !== 'success'){
                    if(answ === 'passw not valid'){
                        alert("Введен не верный пароль");
                    } else {
                        alert("Ошибка "+ answ);
                    }
                } else {
                    alert("Пароль успешно изменен");
                    window.location.reload();
                }
            }
        } else {
            alert("Пароли не свопадают");
        }
    }

    async handleEmailSubmit(e){
        e.preventDefault();
        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/changeEmail.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                id: window.sessionStorage.getItem('id'),
                email: this.state.email
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
        if(answ !== 'success'){
            if(answ === 'exist'){
                alert("Такой email уже существует");
            } else {
                alert("Ошибка "+ answ);
            }
        } else {
            window.sessionStorage.setItem('email',this.state.email);
            window.location.reload();
        }
    }

    async handleFioSubmit(e){
        e.preventDefault();
        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/changeFio.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                id: window.sessionStorage.getItem('id'),
                fio: this.state.fio
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
        if(answ !== 'success'){
            alert("Ошибка "+ answ);
        } else {
            window.sessionStorage.setItem('fio',this.state.fio);
            window.location.reload();
        }
    }
    async handleTelSubmit(e){
        e.preventDefault();
        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/changeTel.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                id: window.sessionStorage.getItem('id'),
                tel: this.state.tel
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
        if(answ !== 'success'){
            if(answ === 'exist'){
                alert("Такой номер уже существует");
            } else {
                alert("Ошибка "+ answ);
            }
        } else {
            window.sessionStorage.setItem('teleph',this.state.tel);
            window.location.reload();
        }
    }


    render() {
        return (
            <div className='container'>
                <h5>Настройки учетной записи</h5>
                <div className='dropdown-divider'/>
                <div className='wrapper7'>
                    <form  onSubmit={this.handleFioSubmit} className="form-inline">
                        <div className="form-group mb-2">
                            <label htmlFor="staticEmail2" className="sr-only">Email</label>
                            <input type="text" readOnly className="form-control-plaintext" id="staticEmail2"
                                   value="Фамилия Имя Отчество"/>
                        </div>
                        <div className="form-group mx-sm-3 mb-2 w-25">
                            <label htmlFor="inputPassword2" className="sr-only">Password</label>
                            <input type="text" className="form-control w-100" id="inputPassword2"
                            value={this.state.fio} onChange={this.handleFioChange}
                            />
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">Сохранить изменениия</button>
                    </form>
                    <form onSubmit={this.handleEmailSubmit} className="form-inline">
                        <div className="form-group mb-2">
                            <label htmlFor="staticEmail2" className="sr-only">Email</label>
                            <input type="text" readOnly className="form-control-plaintext" id="staticEmail2"
                                   value="Электронная почта"/>
                        </div>
                        <div className="form-group mx-sm-3 mb-2 w-25">
                            <label htmlFor="inputPassword2" className="sr-only">Password</label>
                            <input type="text" className="form-control w-100" id="inputPassword2"
                            value={this.state.email} onChange={this.handleEmailChange}
                            />
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">Сохранить изменениия</button>
                    </form>
                    <form onSubmit={this.handleTelSubmit} className="form-inline">
                        <div className="form-group mb-2">
                            <label htmlFor="staticEmail2" className="sr-only">Email</label>
                            <input type="text" readOnly className="form-control-plaintext" id="staticEmail2"
                                   value="Контактный телефон"/>
                        </div>
                        <div className="form-group mx-sm-3 mb-2 w-25">
                            <label htmlFor="inputPassword2" className="sr-only">Password</label>
                            <input type="text" className="form-control w-100" id="inputPassword2"
                            value={this.state.tel} onChange={this.handleTelChange}
                            />
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">Сохранить изменениия</button>
                    </form>
                    <div className='dropdown-divider'/>
                    <h6>Смена пароля</h6>
                    <form onSubmit={this.handlePasswSubmit}>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Текущий пароль</label>
                            <div className="col-sm-10">
                                <input
                                    type="password" className="form-control w-25" id="pass"
                                    placeholder="Текущий пароль" required={true}
                                    value={this.state.passw}
                                    onChange={this.handlePasswChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Новый пароль</label>
                            <div className="col-sm-10">
                                <input
                                    type="password" className="form-control w-25" id="passw"
                                    placeholder="Новый пароль" required={true}
                                    value={this.state.newpassw}
                                    onChange={this.handleNewPasswChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Подтвердите пароль</label>
                            <div className="col-sm-10">
                                <input
                                    type="password" className="form-control w-25" id="pass"
                                    placeholder="Повторите пароль" required={true}
                                    value={this.state.reppassw} onChange={this.handleRepPasswChange}
                                />
                            </div>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">Изменить пароль</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Settings;