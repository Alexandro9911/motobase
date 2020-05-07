import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

 export default function UserInfo() {
    return (
      <div>
          <div className="user-info">
              <div className="flex-container-user">
                  <div className="flex-item">
                      <h5>Petrov</h5>
                  </div>
                  <div className="flex-item">
                      <h5>petr</h5>
                  </div>
                  <div className="flex-item">
                      <h5>Petrovich</h5>
                  </div>
              </div>
              <div className="wrapper4">
                  <h5>id: 1234567</h5>
              </div>
          </div>
      </div>
    );
}

