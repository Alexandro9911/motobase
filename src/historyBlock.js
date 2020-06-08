import React, {Component} from "react";

class HistoryBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            str: props.str
        }
        this.decodeDate = this.decodeDate.bind(this);
    }

    decodeDate(date){
        if(date === '0000-00-00'){
            return 'До сих пор'
        } else {
            return (
                date
            )
        }
    }

    render() {
        const rows = Object.values(JSON.parse(this.state.str));
        if(rows.length === 0){
            return (
                <div className="alert alert-info">Не знаю как так получилось, но тут пусто.</div>
            )
        } else {
            const items = rows.map((row,i) =>
                <div>
                    <div><b>{i+1}</b> Владелец: <b>{row[2]}</b></div>
                    <div>Город: {row[3]}</div>
                    <div>E-mail: {row[4]}</div>
                    <div>Период владения: {row[1]} --- {this.decodeDate(row[0])}</div>
                    <div className="dropdown-divider"/>
                </div>
            );
            return (
                <div className="alert alert-info">{Object.values(items)}</div>
            )
        }
    }
}
export default HistoryBlock