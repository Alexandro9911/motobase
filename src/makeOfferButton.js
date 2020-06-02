import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import NewOffer from "./newOffer";

class MakeOfferButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            motuser: props.motuser,
            motoid: props.motid
        };
        this.handlerOnClick = this.handlerOnClick.bind(this);
    }

    handlerOnClick(){
        window.sessionStorage.setItem('motuser',this.state.motuser);
        window.sessionStorage.setItem('motoid',this.state.motoid);
    }

    render() {
        if (this.state.user !== this.state.motuser) {
            return (
                <Link to={'/userpage/saves/newoffer'}>
                        <button className="btn btn-sm btn-outline-secondary" onClick={this.handlerOnClick}>
                            <div className="small">Совершить сделку</div>
                        </button>
                </Link>
            )
        } else {
            return (
                <div className="small">Это ваше обьявление</div>
            )
        }
    }
}

export default MakeOfferButton;