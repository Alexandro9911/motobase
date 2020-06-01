import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import NewOffer from "./newOffer";

class MakeOfferButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            userMot: props.motuser
        };
    }

    render() {
        if (this.state.user !== this.state.userMot) {
            return (
                <div>
                    <Link to={'/userpage/saves/newoffer'}>
                        <button className="btn btn-sm btn-outline-secondary">
                            <div className="small">Совершить сделку</div>
                        </button>
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="small">Это ваше обьявление</div>
            )
        }
    }
}

export default MakeOfferButton;