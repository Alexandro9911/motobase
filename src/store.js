import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Offers from "./Offers";

class Store extends Component {

    constructor(props) {
        super(props);
        this.state = {
            motoStr: '',
            mark: '',
            type: '',
            cubatyre: '',
            model: ''
        };

        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleCubatureChange = this.handleCubatureChange.bind(this);
        this.handleMarkChange = this.handleMarkChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
    }

    handleTypeChange(event) {
        this.setState({type: event.target.value});
    }

    handleModelChange(event) {
        this.setState({model: event.target.value});
    }

    handleMarkChange(event) {
        this.setState({mark: event.target.value});
    }

    handleCubatureChange(event) {
        this.setState({cubature: event.target.value});
    }


    async handlerSubmit(e) {
        e.preventDefault();
        let answ = '';
        let resp = await fetch("http://localhost/motobase/findOffers.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                mark: this.state.mark,
                type: this.state.type,
                model: this.state.model,
                cubature: this.state.cubature
            })
        })
            .then(response => response.json())
            .then(result => answ = result)
        this.state.motoStr = JSON.stringify(answ);
        window.sessionStorage.setItem("storeRes", this.state.motoStr);
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className="wrapper7">
                    <h5>Поиск мотоциклов</h5>
                    <form onSubmit={this.handlerSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Выберите марку</label>
                            <select className="custom-select" id="inlineFormCustomSelectPref"
                                    value={this.state.mark}
                                    required={true}
                                    onChange={this.handleMarkChange}>
                                <option selected>Choose...</option>
                                <option value="1">Kawasaki</option>
                                <option value="2">Honda</option>
                                <option value="3">Yamaha</option>
                                <option value="4">KTM</option>
                                <option value="5">Suzuki</option>
                                <option value="6">Harley Davidson</option>
                                <option value="7">BSE</option>
                                <option value="8">Irbis</option>
                                <option value="9">Pitster Pro</option>
                                <option value="10">Apollo</option>
                                <option value="11">Lifan</option>
                                <option value="12">Wels</option>
                                <option value="13">Stels</option>
                                <option value="14">Самоделка</option>
                                <option value="15">BMW</option>
                                <option value="16">Другая</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Модель</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   value={this.state.model}
                                   required={true}
                                   onChange={this.handleModelChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Тип</label>
                            <select className="custom-select" id="inlineFormCustomSelectPref"
                                    value={this.state.type}
                                    required={true}
                                    onChange={this.handleTypeChange}>
                                <option selected>Choose...</option>
                                <option value="1">Sport</option>
                                <option value="2">Cross</option>
                                <option value="3">Enduro</option>
                                <option value="4">Motard</option>
                                <option value="5">Super Motard</option>
                                <option value="6">Super Moto</option>
                                <option value="7">Classic</option>
                                <option value="8">CafeRacer</option>
                                <option value="9">Chopper</option>
                                <option value="10">Drag</option>
                                <option value="11">Electro</option>
                                <option value="12">Scooter</option>
                                <option value="13">Maxi Scooter</option>
                                <option value="14">Pitbike</option>
                                <option value="15">Jumper</option>
                                <option value="16">Другое</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Кубатура</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   value={this.state.cubature}
                                   required={true}
                                   onChange={this.handleCubatureChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Показать обьявления</button>
                    </form>
                </div>
                <div className='dropdown-divider'/>
                <Offers/>
            </div>
        )
    }
}

export default Store