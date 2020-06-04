import React, {Component} from "react";

class MakeOfferButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            motuser: props.motuser,
            motoid: props.motid,
            added: false
        };
        this.handlerOnClickAdd = this.handlerOnClickAdd.bind(this);
        this.handlerOnClickDelete = this.handlerOnClickDelete.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    changeState(){
        if(this.state.added){
            this.setState({added: false});
        } else {
            this.setState({added: true});
        }
    }

    async handlerOnClickDelete(){
        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/deleteOffer.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                pretendent: this.state.user,
                motuser: this.state.motuser,
                status: '1',
                type: "1",
                motoid: this.state.motoid
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
        if(answ !== 'success'){
            if (answ === 'denied'){
                alert("Эта сделка уже отклонена продавцом");
                this.changeState();
            } else {
                alert("error: "+ answ);
            }
        } else {
            this.changeState();
        }
    }

    async handlerOnClickAdd() {
       //let rnd = Math.floor(Math.random() * 1000) + 100;
       //alert(rnd);

        // 1 = by  0 = sell

        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/makeOffer.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                pretendent: this.state.user,
                motuser: this.state.motuser,
                status: '1',
                type: "1",
                motoid: this.state.motoid
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
        if(answ !== 'success'){
            if(answ === 'already there'){
                alert('У вас уже есть эта сделка.');
                this.changeState();
            } else {
                alert("error: "+ answ);
            }
        } else {
            this.changeState();
        }
    }

    render() {
        if (this.state.user !== this.state.motuser) {
            if(this.state.added){
                return (
                    <button className="btn btn-sm btn-outline-secondary" onClick={this.handlerOnClickDelete}>
                        <div className="small">Отменить сделку</div>
                    </button>
                )
            } else {
                return (
                    <button className="btn btn-sm btn-outline-secondary" onClick={this.handlerOnClickAdd}>
                        <div className="small">Готов на сделку</div>
                    </button>
                )
            }
        } else {
            return (
                <div className="small">Это ваше обьявление</div>
            )
        }
    }
}

export default MakeOfferButton;