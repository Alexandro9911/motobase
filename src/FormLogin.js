import React, {Component} from 'react';

class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',

        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswChange = this.handlePasswChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        let user = {
            userEmail: this.state.email,
            userPassw: this.state.passw
        };
        let answ = '';
        let resp = await fetch("http://localhost/motobase/findUserInDB.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                email: user.userEmail,
                passw: user.userPassw
            })
        })
            .then(response => response.text())
            .then(result => answ = result)

        if (answ === 'allCorrect') {
            window.sessionStorage.setItem("user", user.userEmail);
            window.location.assign('/userpage');
        } else {
            if (answ === 'somethingWrong') {
                alert('Неверный пароль');
            } else {
                if (answ === 'notExist') {
                    alert('Похоже вы не зарегистрированы');
                    window.location.assign('/registration');
                } else {
                    alert('Ошибка соединения с базой данных');
                }
            }
        }
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswChange(event) {
        this.setState({passw: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className='wrapper2'>
                        <div className="form-group row">
                            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Логин</label>
                            <div className="col-sm-10">
                                <input
                                    type="email" className="form-control" id="email" placeholder=" Email"
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
                                    type="password" className="form-control" id="passw" placeholder="Пароль"
                                    required={true}
                                    value={this.state.passw}
                                    onChange={this.handlePasswChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper2">
                    <button className="btn btn-light">
                        Войти
                    </button>
                </div>
            </form>
        );
    }
}

export default FormLogin;