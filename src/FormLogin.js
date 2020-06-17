import React, {Component} from 'react';

class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            count: 0
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
        window.sessionStorage.setItem("partialEmail",this.state.email);
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
            let dataArr;
            let answer1 = '';
            this.state.email = window.sessionStorage.getItem("user");
            let resp = await fetch("http://localhost/motobase/findUserInfo.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: new URLSearchParams({
                    email: this.state.email,
                })
            })
                .then(response => response.text())
                .then(result => answer1 = result)
            if (answer1 !== "Err") {
                dataArr = answer1.split('#');
                let fio = dataArr[0];
                let email = dataArr[1];
                let id = dataArr[2];
                let teleph = dataArr[3];

                window.sessionStorage.setItem('fio', fio);
                window.sessionStorage.setItem('email', email);
                window.sessionStorage.setItem('id', id);
                window.sessionStorage.setItem('teleph', teleph);
            } else {
                alert("Error with connection to Database. Now you will be redirect to mainpage. Please try it again later");
                window.location.assign('/mainpage');
            }

            window.location.assign('/userpage');
        } else {
            if (answ === 'somethingWrong' || answ === 'notExist') {
                let ind = this.state.count + 1
                this.setState({count: ind});
                if(this.state.count >= 3){
                    alert('Похоже вы не зарегистрированы либо забыли пароль');
                    if(this.state.count === 5){
                        window.location.assign('/registration');
                    }
                } else {
                    alert('Неверный адрес электронной почты или пароль.');
                }
            } else {
                    alert('Ошибка соединения с базой данных');
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