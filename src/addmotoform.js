import React, {Component} from "react";

class Addmotoform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vin: '',
            name: '',
            type: '',
            mark: '',
            year: '',
            country: '',
            cubature: '',
        };
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleCubatureChange = this.handleCubatureChange.bind(this);
        this.handleMarkChange = this.handleMarkChange.bind(this);

        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    async handlerSubmit(e) {
        e.preventDefault();
        let moto = {
            moto_vin: this.state.vin,
            moto_name: this.state.name,
            moto_type: this.state.type,
            moto_mark: this.state.mark,
            moto_year: this.state.year,
            moto_cubature: this.state.cubature,
            moto_country: this.state.country
        };
        if (this.state.passw === this.state.reppasw) {
            let answ = '';
            let resp = await window.fetch("http://localhost/motobase/addmoto.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: new URLSearchParams({
                    vin: moto.moto_vin,
                    name: moto.moto_name,
                    type: moto.moto_type,
                    mark: moto.moto_mark,
                    year: moto.moto_year,
                    cubature: moto.moto_cubature,
                    country: moto.moto_country,
                    user: window.sessionStorage.getItem('id')
                })
            })
                .then(response => response.text())
                .then(result => answ = result);
            if (answ === 'success') {
                alert("Мотоцикл добавлен");
                window.location.reload();
            } else {
                if(answ === 'exist'){
                    alert("Мотоцикл с таким vin уже существует");
                } else {
                    alert("err: " + answ);
                }
            }
        }
    }

    handleVinChange(event) {
        this.setState({vin: event.target.value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleCountryChange(event) {
        this.setState({country: event.target.value});
    }

    handleTypeChange(event) {
        this.setState({type: event.target.value});
    }

    handleMarkChange(event) {
        this.setState({mark: event.target.value});
    }

    handleCubatureChange(event) {
        this.setState({cubature: event.target.value});
    }

    handleYearChange(event) {
        this.setState({year: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handlerSubmit}>
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <div className="input-group mb-2">
                            <select className="custom-select" id="inlineFormCustomSelectPref"
                                    required={true}
                                    value={this.state.mark}
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
                    </div>
                    <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInput">Name</label>
                        <input type="text" className="form-control mb-2" id="inlineFormInput"
                               placeholder="Example CBR"
                               required={true}
                               value={this.state.name}
                               onChange={this.handleNameChange}/>
                    </div>
                    <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInput">Cubature</label>
                        <input type="text" className="form-control mb-2" id="inlineFormInput"
                               placeholder="1000"
                               required={true}
                               value={this.state.cubature}
                               onChange={this.handleCubatureChange}/>
                    </div>
                    <div className="col-auto">
                        <div className="input-group mb-2">
                            <select className="custom-select" id="inlineFormCustomSelectPref"
                                    required={true}
                                    value={this.state.type}
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
                    </div>
                </div>
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInput">Year</label>
                        <input type="text" className="form-control mb-2" id="inlineFormInput"
                               placeholder="2020"
                               required={true}
                               value={this.state.year}
                               onChange={this.handleYearChange}/>
                    </div>
                    <div className="col-auto">
                        <div className="input-group mb-2">
                            <select className="custom-select" id="inlineFormCustomSelectPref"
                                    required={true}
                                    value={this.state.country}
                                    onChange={this.handleCountryChange}>
                                <option selected>Choose...</option>
                                <option value="1">Россия</option>
                                <option value="2">Украина</option>
                                <option value="3">Япония</option>
                                <option value="4">Германия</option>
                                <option value="5">Австрия</option>
                                <option value="6">Китай</option>
                                <option value="7">США</option>
                                <option value="8">Индия</option>
                                <option value="9">Республика Беларусь</option>
                                <option value="10">Финляндия</option>
                                <option value="11">Корея</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInput">vin</label>
                        <input type="text" className="form-control mb-2" id="inlineFormInput"
                               placeholder="vin"
                               required={true}
                               value={this.state.vin}
                               onChange={this.handleVinChange}/>
                    </div>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                </div>
            </form>
        );
    }
}

export default Addmotoform;