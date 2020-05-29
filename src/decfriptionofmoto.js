import React, {Component} from "react";
import UserNavs from "./usernavs";
import usernavs from "./usernavs";

class Decfriptionofmoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: props.value,
            vin : props.vin,
            description: props.value,
            index : props.index
        };
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerValueChange = this.handlerValueChange.bind(this);
    }


    handlerValueChange(event) {
        this.setState({description: event.target.value});
    }

    async handlerSubmit(e){
        e.preventDefault();
        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/updateDescr.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                vin : this.state.vin ,
                descr : this.state.description
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
        if (answ === 'success') {
            let motoStr = window.sessionStorage.getItem('motocycles');
            const motocycles = Object.values(JSON.parse(motoStr));
            motocycles[this.state.index]['description'] = this.state.description
            motocycles.toString();
            let finalFSON = JSON.stringify(motocycles);
            window.sessionStorage.setItem('motocycles',finalFSON);
            window.location.reload();
        } else {
            alert("Ошибка " + answ);
        }
    }

    render() {
        return (
            <form onSubmit={this.handlerSubmit}>
                <div className="form-group">
                    <textarea className="form-control" placeholder={this.state.description} id="exampleFormControlTextarea1" rows="3"
                              value={this.state.description}
                              onChange={this.handlerValueChange}
                    >
                    </textarea>
                    <button className="btn btn-outline-secondary">
                        Изменить название
                    </button>
                </div>
            </form>
        )
    }
}
export default Decfriptionofmoto;