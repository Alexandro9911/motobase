import React, {Component} from "react";

class AddToWishlistButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonState: false,
            user: props.user,
            vin: props.vin,
            flag: 0
        };
        this.handlerOnClick = this.handlerOnClick.bind(this);
        this.getTextButton = this.getTextButton.bind(this);
    }

    async handlerOnClick(e){
        e.preventDefault();
        if(this.state.buttonState){
            this.setState({buttonState: false});
            let answ = '';
            let resp = await window.fetch("http://localhost/motobase/deleteFromWishList.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: new URLSearchParams({
                    user: this.state.user,
                    motocycle: this.state.vin
                })
            })
                .then(response => response.text())
                .then(result => answ = result);
            if (answ !== 'success') {
                alert("Возникла ошибка: " + answ);
            }
        } else {
            this.setState({buttonState: true});
            let answ = '';
            let resp = await window.fetch("http://localhost/motobase/addToWishList.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: new URLSearchParams({
                    user: this.state.user,
                    motocycle: this.state.vin
                })
            })
                .then(response => response.text())
                .then(result => answ = result);
            if (answ !== 'success') {
                if (answ === 'already there'){
                    alert("Уже добавлено");
                } else {
                    if(answ === 'not aviable'){
                        this.setState({flag: 1});
                        alert("Мотоцикл снят с продажи, обновите список предложений, сделав повторный запрос");
                    } else {
                        alert("Возникла ошибка: " + answ);
                    }
                }
            }
        }
    }

    getTextButton(){
        if(this.state.buttonState){
            return '- из избранного'
        } else {
            return '+ в избранное'
        }
    }

    render() {
        if(this.state.flag === 1){
            return (
                <button className="btn btn-sm btn-outline-success">
                    <div className="small">+ в избранное</div>
                </button>
            )
        } else {
            if (this.state.buttonState){
                return (
                    <button className="btn btn-sm btn-outline-secondary" onClick={this.handlerOnClick}>
                        <div className="small">- из избранное</div>
                    </button>
                )
            } else {
                return (
                    <button className="btn btn-sm btn-outline-success" onClick={this.handlerOnClick}>
                        <div className="small">+ в избранное</div>
                    </button>
                )
            }
        }
    }
}

export default AddToWishlistButton;
