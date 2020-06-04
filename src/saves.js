import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MakeOfferButton from "./makeOfferButton";
import {Route, Switch} from "react-router-dom";
import MyOffers from "./myOffers";

class Saves extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resultStr: window.sessionStorage.getItem('saves'),
            clickMotoId: '',
            clickMotUser: '',

        }
        this.retVin = this.retVin.bind(this);
    }

    retVin(vin){
        let arr = vin.split("");
        let length = arr.length;
        return(
           arr[0]+arr[1]+'***'+arr[length-3]+arr[length-2]+arr[length-1]
        )
    }

    render() {
        if (this.state.resultStr === null) {
            return (
                <div className="wrapper7">
                    <div className="alert alert-danger">
                        Пока что тут пусто
                    </div>
                </div>
            )
        } else {
            const motocycles = Object.values(JSON.parse(this.state.resultStr));
            let pageUser = window.sessionStorage.getItem('id');
            let q = motocycles.length;
            if (q > 0) {
                let offer;
                const items = motocycles.map((mot, i) =>
                    <div className="container" key={i}>
                        <div className="wrapper6">
                            <div className="card border-dark mb-3">
                                <div className="card-header">{mot['mark']} {mot['nameMoto']}</div>
                                <div className="card-body">
                                    <h5 className="card-title">{mot['type']}</h5>
                                    <div>vin: {this.retVin(mot['vin'])}</div>
                                    <div>страна: {mot['country']}</div>
                                    <div>Год выпуска: {mot['year']}</div>
                                    <div>Кубатура: {mot['cubature']}</div>
                                    <div>Владелец: {mot[0]}</div>
                                    <div>E-mail: {mot[1]}</div>
                                    <div>Телефон: {mot[2]}</div>
                                    <div>Город: {mot[3]}</div>
                                    <div className='dropdown-divider'/>
                                    <div>Описание: {mot['description']}</div>
                                    <div className='dropdown-divider'/>
                                    <div className="small">
                                        <button className="btn btn-sm btn-outline-secondary"
                                                onClick={async function () {
                                                    let answ = '';
                                                    let resp = await window.fetch("http://localhost/motobase/deleteFromMyWishList.php", {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                                                        },
                                                        body: new URLSearchParams({
                                                            user: pageUser,
                                                            id: mot['motoid']
                                                        })
                                                    })
                                                        .then(response => response.text())
                                                        .then(result => answ = result);
                                                    if (answ === 'success') {
                                                        let finalFSON;
                                                        let motoStr = window.sessionStorage.getItem('saves');
                                                        const motocycles = Object.values(JSON.parse(motoStr));
                                                        motocycles.splice(i, 1);
                                                        motocycles.toString();
                                                        finalFSON = JSON.stringify(motocycles);
                                                        window.sessionStorage.setItem('saves', finalFSON);
                                                        window.location.reload();
                                                    } else {
                                                        alert("error: " + answ);
                                                    }
                                                }}>
                                            <div className="small">- убрать из избранного</div>
                                        </button>
                                       <MakeOfferButton user={pageUser} motuser={mot['user']} motid={mot['motoid']}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                return (
                    <div className="wrapper7">
                        <h4>Список сохраненных обьявлений</h4>
                        <div className="wrapper7">
                            <div>{Object.values(items)}</div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="wrapper7">
                        <h5>Список сохраненных обьявлений</h5>
                        <div className="alert alert-danger">
                            Список пуст
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Saves