import React, {Component} from "react";
import Decfriptionofmoto from "./decfriptionofmoto";
import AddInGarage from "./addingarage";

class MyOffers extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let motoStr = window.sessionStorage.getItem('offers');
        const motocycles = Object.values(JSON.parse(motoStr));
        let q = motocycles.length;
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
                                <div className='dropdown-divider'/>
                                <div>Описание: { mot['description']} </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            return (
                <div>
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
                    <div className='container'>
                        <div className="alert alert-info" role="alert">
                            У вас нет мотоциклов
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default MyOffers;