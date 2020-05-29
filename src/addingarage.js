import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Addmotoform from "./addmotoform";

export default function AddInGarage() {
    return (
        <div className='wrapper7'>
            <h3>Мой гараж</h3>
            <p>
                <button className="btn btn-outline-secondary" type="button" data-toggle="collapse"
                        data-target="#collapseExample"
                        aria-expanded="false" aria-controls="collapseExample">
                    + Добавить новый мотоцикл
                </button>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <Addmotoform/>
                </div>
            </div>
        </div>
    );
}