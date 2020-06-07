import React, {Component} from "react";
import Decfriptionofmoto from "./decfriptionofmoto";
import AddInGarage from "./addingarage";
import Offerdescr from "./offerdescr";
import ChangeOfferStatus from "./changeOfferStatus";

class MyOffers extends Component {
    constructor(props) {
        super(props);
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
                                <div>vin: {this.retVin(mot['vin'])}</div>
                                <div>страна: {mot['country']}</div>
                                <div>Год выпуска: {mot['year']}</div>
                                <div>Кубатура: {mot['cubature']}</div>
                                <div className='dropdown-divider'/>
                                <div>Описание: { mot['description']} </div>
                                {/*
                                mot[0-3] - motuser info
                                mot[4] = offer id
                                mot[5] = moto_id
                                mot[6] = motuser_id
                                mot[7] = pretendent
                                mot[8] = status
                                */}
                                <div className='dropdown-divider'/>
                                <div><h5>Подробности сделки</h5></div>
                                <Offerdescr myid={window.sessionStorage.getItem('id')}
                                            motuser_id={mot[6]}
                                            pretendent={mot[7]}
                                            pret_fio={mot[9]}
                                            pret_email={mot[10]}
                                            pret_tel={mot[11]}
                                            motuser_fio={mot[0]}
                                            motuser_email={mot[1]}
                                            motuser_tel={mot[2]}
                                />
                                <div className="small">
                                    <ChangeOfferStatus
                                        myid={window.sessionStorage.getItem('id')}
                                        motuser_id={mot[6]}
                                        pretendent={mot[7]}
                                        pret_fio={mot[9]}
                                        pret_email={mot[10]}
                                        pret_tel={mot[11]}
                                        motuser_fio={mot[0]}
                                        motuser_email={mot[1]}
                                        motuser_tel={mot[2]}
                                        offer_status={mot[8]}
                                        index={i}
                                        offerid={mot[4]}
                                        motoid={mot['motoid']}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            return (
                <div className="wrapper7">
                    <h4>Мои сделки</h4>
                    <div className="dropdown-divider"/>
                    <div className='container'>
                        <div>
                            <div>{Object.values(items)}</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='wrapper7'>
                    <h4>Мои сделки</h4>
                    <div className="dropdown-divider"/>
                    <div className='container'>
                        <div className="alert alert-info" role="alert">
                            У вас нет сделок
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default MyOffers;