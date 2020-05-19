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
        return (
            <div>
                <h4>User Settings</h4>
            </div>
        );
    }
}

export default Settings;