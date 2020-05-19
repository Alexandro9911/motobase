import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            id:'',
            fio:'',
            teleph:'',
           // city:'',
           // country:''
        };
    }

    render() {
        if(window.sessionStorage.length === 0){
            window.location.assign('/loginpage');
        } else {
           // this.getInfoFromDB();
            return (
                <div>{window.sessionStorage.getItem('fio')}</div>
            );
        }
    }
}

export default UserInfo;