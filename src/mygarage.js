import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import AddInGarage from "./addingarage";

let names = ['IRBIS TTR', "BSE PH 10", "KTM DUKE", "Honda CBR"];
let typeArr = ['Питбайк', "Питбайк", "Супермото", "Спорт"];
let commArr;
let q = 1;

export default function Mygarage() {
    let str = "Крутой мотик #Самое то для начинающего, правда сейчас сломан#Быстрый резкий как понос#литр это здорово";
    commArr = str.split('#')
    const comments = commArr.map((comment) => <div>{comment}</div>);
    const types = typeArr.map((type) => <div>{type}</div>);
    const items = names.map((moto, i) =>
        <div className="wrapper6">
            <div className="card border-dark mb-3">
                <div className="card-header">{moto}</div>
                <div className="card-body">
                    <h5 className="card-title">{types[i]}</h5>
                    <div>vin:</div>
                    <div>страна:</div>
                    <div>Год выпуска:</div>
                    <div>Кубатура:</div>
                    <div>Количество владельцев:</div>
                    <div className='dropdown-divider'/>
                    <div>{comments[i]}</div>
                </div>
            </div>
        </div>
    );
    if (q > 0) {
        return (
            <div>
                <AddInGarage/>
                <div className='container'>
                    <div className='wrapper5'>
                        {items}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <AddInGarage/>
                <div className='container'>
                    <div className='text-center'>
                        <div className='alert-info'>
                            Пока что у вас нет мотоциклов
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}