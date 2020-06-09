import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import AddInGarage from "./addingarage";
import Decfriptionofmoto from "./decfriptionofmoto";
import ShowHistory from "./showHistory";

let q = 0;
class  Mygarage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let motoStr = window.sessionStorage.getItem('motocycles');
        const motocycles = Object.values(JSON.parse(motoStr));
        q = motocycles.length;
        if (q > 0) {
            const items = motocycles.map((mot,i) =>
                <div key={i}>
                    <div className="wrapper6">
                        <div className="card border-dark mb-3">
                            <div className="card-header">{mot['mark']} {mot['nameMoto']}</div>
                            <div className="card-body">
                                <h5 className="card-title">{mot['type']}</h5>
                                <div>vin: {mot['vin']}</div>
                                <div>страна: {mot['country']}</div>
                                <div>Год выпуска: {mot['year']}</div>
                                <div>Кубатура: {mot['cubature']}</div>
                                <div className="flex-container-btn">
                                    <div className="flex-item-btn">
                                        <div>{decodeStatus(mot['status'])}</div>
                                    </div>
                                    <div className="flex-item-btn">
                                        <div className="small">
                                            <div className="btn btn-sm btn-outline-secondary"
                                                 onClick={async function () {
                                                     if(mot['status'] === '2'){
                                                         alert('Действие недоступно. завершите сделку');
                                                     } else {
                                                     let answ = '';
                                                     let newStat;
                                                     if(mot['status'] === '1'){
                                                         newStat = '0';
                                                     } else {
                                                         newStat = '1';
                                                         let resp = await window.fetch("http://localhost/motobase/deleteFromStore.php", {
                                                             method: "POST",
                                                             headers: {
                                                                 "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                                                             },
                                                             body: new URLSearchParams({
                                                                 moto : mot['motoid']
                                                             })
                                                         })
                                                             .then(response => response.text())
                                                             .then(result => answ = result);
                                                     }
                                                     let resp = await window.fetch("http://localhost/motobase/updateStatus.php", {
                                                         method: "POST",
                                                         headers: {
                                                             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                                                         },
                                                         body: new URLSearchParams({
                                                             vin : mot['vin'] ,
                                                             stat : newStat,
                                                             motoid: mot['motoid']
                                                         })
                                                     })
                                                         .then(response => response.text())
                                                         .then(result => answ = result);
                                                     if (answ === 'success') {
                                                         let finalFSON;
                                                         let motoStr = window.sessionStorage.getItem('motocycles');
                                                         const motocycles = Object.values(JSON.parse(motoStr));
                                                         motocycles[i]['status'] = newStat;
                                                         motocycles.toString();
                                                         finalFSON = JSON.stringify(motocycles);
                                                         window.sessionStorage.setItem('motocycles',finalFSON);
                                                         window.location.reload();
                                                     } else {
                                                         alert("Ошибка " + answ);
                                                     }
                                                 }}}>
                                                <div className="small">Изменить статус</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='dropdown-divider'/>
                                <div>Описание: </div>
                                <Decfriptionofmoto status={mot['status']} value={mot['description']} vin={mot['vin']} index={i}/>
                                <ShowHistory moto={mot['motoid']}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
            return (
                <div>
                    <AddInGarage/>
                    <div className='container'>
                        <div>
                            <div>{Object.values(items)}</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <AddInGarage/>
                    <div className='container'>
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <p className="lead text-center">
                                    Пока что тут ничего нет. Внесите свои мотоциклы в базу, либо приобретите в магазине
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Mygarage;

function decodeStatus(value) {
    switch (value) {
        case '1': {
            return (
                <div className="alert-success">
                    Статус: В личном пользовании
                </div>
            );
        }
        case '0':{
            return (
                <div className="alert-primary">
                    Статус: На продаже
                </div>
            );
        }
        case '2':{
            return (
                <div className="alert-warning">
                    Статус: В сделке
                </div>
            );
        }
    }
}
