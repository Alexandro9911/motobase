import React, {Component} from "react";
import AddToWishlistButton from "./addToWishlistButton";
import HistoryBlock from "./historyBlock";

class ShowHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            btnstate: false,
            motoid: props.moto,
            res: ''
        }
        this.changeStateButton = this.changeStateButton.bind(this);
    }

 async changeStateButton(){
        if(this.state.btnstate){
            this.setState({btnstate: false});
        } else {
            let answ = '';
            let resp = await window.fetch("http://localhost/motobase/findHistory.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: new URLSearchParams({
                    motoid: this.state.motoid
                })
            })
                .then(response => response.json())
                .then(result => answ = result);
            this.setState({res: JSON.stringify(answ)});
            this.setState({btnstate: true});

        }
    }

    render() {
        if(!this.state.btnstate){
            return(
                <button className="btn btn-sm btn-outline-secondary" onClick={this.changeStateButton}>
                    <div className="small">Показать историю</div>
                </button>
            )
        } else {
            return(
                <div>
                    <div className="dropdown-divider"/>
                    <HistoryBlock str={this.state.res}/>
                    <button className="btn btn-sm btn-outline-secondary" onClick={this.changeStateButton}>
                        <div className="small">Скрыть историю</div>
                    </button>
                </div>
            )
        }
    }
}
export default ShowHistory