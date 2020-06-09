import React, {Component} from "react";
import AddToWishlistButton from "./addToWishlistButton";
import ShowHistory from "./showHistory";
class Offers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resultStr: window.sessionStorage.getItem('storeRes')
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
        if(this.state.resultStr === null){
            return(
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <p className="lead text-center">
                            Введите запрос
                        </p>
                    </div>
                </div>
            )
        } else {
            const motocycles = Object.values(JSON.parse(this.state.resultStr));
            let pageUser = window.sessionStorage.getItem('id');
            let q = motocycles.length;
            if(q > 0) {
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
                                        <AddToWishlistButton user={pageUser} vin={mot['vin']}/>
                                        <ShowHistory moto={mot['motoid']}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                return (
                    <div>{Object.values(items)}</div>
                );
            } else {
                return (
                    <div className="wrapper7">
                        <div className="alert alert-danger">
                            Результатов нет :( Либо сейчас таких мотоциклов в продаже нет, либо уточните запрос
                        </div>
                    </div>
                );
            }
        }
    }
}
export default Offers