import React, {Component} from "react";

class Offerdescr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myid: props.myid,
            motuser_id: props.motuser_id,
            pretendent: props.pretendent,
            pret_fio: props.pret_fio,
            pret_email: props.pret_email,
            pret_tel: props.pret_tel,
            motuser_fio: props.motuser_fio,
            motuser_email: props.motuser_email,
            motuser_tel: props.motuser_tel
        };

    }

    render() {
        if(this.state.motuser_id === this.state.myid){
            return(
                <div>
                    <div className="text-info">Тип сделки: продажа</div>
                    <div>Информация о покупателе: </div>
                    <div><h6>{this.state.pret_fio}</h6></div>
                    <div>Эл. почта: {this.state.pret_email}</div>
                    <div>Телефон: {this.state.pret_tel}</div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="text-success">Тип сделки: покупка</div>
                    <div>Информация о продавце: </div>
                    <div><h6>{this.state.motuser_fio}</h6></div>
                    <div>Эл. почта: {this.state.motuser_email}</div>
                    <div>Телефон: {this.state.motuser_tel}</div>
                </div>
            )
        }
    }
}

export default Offerdescr;