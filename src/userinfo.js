import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',

        };
    }



    render() {
        if(window.sessionStorage.length === 0){
            alert("А как же авторизация? ну ка быстро на авторизацию!");
            window.location.assign('/loginpage');
        } else {

            return (
                <h6>{window.sessionStorage.getItem('user')}</h6>
            );
        }
    }
}

export default UserInfo;