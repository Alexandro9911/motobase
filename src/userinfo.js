import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

//  export default function UserInfo() {
//     return (
//       <div>
//           <div className="user-info">
//
//           </div>
//       </div>
//     );
// }

class UserInfo extends Component {
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
                <h4>{window.sessionStorage.getItem('user')}</h4>
            </div>
        );
    }
}

export default UserInfo;