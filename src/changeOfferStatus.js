import React, {Component} from "react";

class ChangeOfferStatus extends Component {
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
            motuser_tel: props.motuser_tel,
            offer_status: props.offer_status,
            entered_code: '',
            index: props.index,
            offerid: props.offerid,
            motoid: props.motoid
        };

        this.prove = this.prove.bind(this);
        this.denie = this.denie.bind(this);
        this.deleteOffer = this.deleteOffer.bind(this);
        this.getCode = this.getCode.bind(this);
        this.checkCodeAndBy = this.checkCodeAndBy.bind(this);
        this.enteredCodeHandler = this.enteredCodeHandler.bind(this);
    }
    async prove(){
        this.setState({offer_status: '2'});

        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/changeStatToSecond.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                offerid: this.state.offerid,
                newstat: '2',
                motoid: this.state.motoid
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
            let finalJSON;
            let motoStr = window.sessionStorage.getItem('offers');
            const motocycles = Object.values(JSON.parse(motoStr));
            motocycles[this.state.index][8] = '2';
            motocycles.toString();
            finalJSON = JSON.stringify(motocycles);
            window.sessionStorage.setItem('offers', finalJSON);
        window.location.assign('myoffers');

    }

    async denie(){
        this.setState({offer_status: '3'});
        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/changeStatToThird.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                offerid: this.state.offerid,
                newStat: '3',
                motoid: this.state.motoid
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
            let finalJSON;
            let motoStr = window.sessionStorage.getItem('offers');
            const motocycles = Object.values(JSON.parse(motoStr));
            motocycles[this.state.index][8] = '3';
            motocycles.toString();
            finalJSON = JSON.stringify(motocycles);
            window.sessionStorage.setItem('offers', finalJSON);
        window.location.assign('myoffers');

    }

    async deleteOffer(){
        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/delOfferById.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                offerid: this.state.offerid,
                motoid: this.state.motoid
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
            let finalJSON;
            let motoStr = window.sessionStorage.getItem('offers');
            const motocycles = Object.values(JSON.parse(motoStr));
            motocycles.splice(this.state.index, 1);
            motocycles.toString();
            finalJSON = JSON.stringify(motocycles);
            window.sessionStorage.setItem('offers', finalJSON);
        window.location.assign('myoffers');
    }

    async getCode(){
        let rnd = Math.floor(Math.random() * 1000) + 100;
        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/setCode.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                offerid: this.state.offerid,
                vercode: rnd.toString()
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
        if(answ !== 'success'){

        } else {
            alert("Код подтверждения: "+ rnd);
            window.location.assign('myoffers');
        }
    }

    async checkCodeAndBy(e){
        e.preventDefault();
        let answ = '';
        let resp = await window.fetch("http://localhost/motobase/checkCodeAndBy.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                offerid: this.state.offerid,
                enteredcode: this.state.entered_code
            })
        })
            .then(response => response.text())
            .then(result => answ = result);
        if(answ !== 'success'){
            if(answ === 'wrong code'){
                alert("Неправильный код. Повторите попытку");
            } else {

            }
        } else {
            alert("Куплено");
            this.setState({offer_status: '3'});
            if(this.state.motuser_id === this.state.myid){
                let finalJSON;
                let motoStr = window.sessionStorage.getItem('motocycles');
                const motocycles = Object.values(JSON.parse(motoStr));
                let ind = 0;
                for(let i = 0; i< motocycles.length; i++){
                    if(motocycles[i]['motoid'] === this.state.motoid){
                        ind = i;
                        break;
                    }
                }
                motocycles.splice(ind, 1);
                motocycles.toString();
                finalJSON = JSON.stringify(motocycles);
                window.sessionStorage.setItem('motocycles', finalJSON);

                let finalJSON1;
                let offStr = window.sessionStorage.getItem('offers');
                const offers = Object.values(JSON.parse(offStr));
                offers.splice(this.state.index, 1);
                offers.toString();
                finalJSON1 = JSON.stringify(offers);
                window.sessionStorage.setItem('offers', finalJSON1);
                window.location.assign('myoffers');
            } else {
                let finalJSON;
                let motoStr = window.sessionStorage.getItem('motocycles');
                const motocycles = Object.values(JSON.parse(motoStr));
                let answer = ''
                let resp = await window.fetch("http://localhost/motobase/getMoto.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    body: new URLSearchParams({
                        motoid: this.state.motoid
                    })
                })
                    .then(response => response.json())
                    .then(result => answer = result);
                const newMoto = Object.values(JSON.parse(JSON.stringify(answer)));
                motocycles.push(newMoto);
                motocycles.toString();
                finalJSON = JSON.stringify(motocycles);
                window.sessionStorage.setItem('motocycles', finalJSON);

                let finalJSON1;
                let offStr = window.sessionStorage.getItem('offers');
                const offers = Object.values(JSON.parse(offStr));
                offers.splice(this.state.index, 1);
                offers.toString();
                finalJSON1 = JSON.stringify(offers);
                window.sessionStorage.setItem('offers', finalJSON1);
                window.location.assign('myoffers');
            }
        }
    }

    enteredCodeHandler(event){
            this.setState({entered_code: event.target.value});
    }

    /**
     * Алгоритм
     *  ПОКУПАТЕЛЬ               ПРОДАВЕЦ                   ДЕЙСТВИЕ
     *
     *1     -                Подтвердить\отклонить        подтвердить - статус 2 и мотоцикл в сейф \ отклонить - статус 3
     *2 Подтверждаю/нет              Продаю\отменяю          продаю - генерирует код и выводит. отмена - удаление стелдки вывод мотика из сейфа
     *3                                                      подтверждаю - вывод из сейфа с введенным кодом и смена хозяина
     *
     * cтатусы:
     *   1 - простой статус \ ожидает подтверждения
     *   2 - подтвержденный
     *
     */

    render() {
        if(this.state.offer_status === '1'){ // stat == 1
            if(this.state.motuser_id === this.state.myid){
                return( // seller
                    <div>
                        <h6>Статус сделки: Ожидает подтверждения</h6>
                        <div className="small">
                            <div className="btn btn-sm btn-outline-success" onClick={this.prove}>
                                Подтвердить
                            </div>
                            <div className="btn btn-sm btn-outline-danger"  onClick={this.denie}>
                                Отклонить предложение
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h6> Статус сделки: Запрошено подтверждение</h6>
                        <div className="small">
                            <div className="btn btn-sm btn-outline-danger" onClick={this.deleteOffer}>
                                Отменить и удалить
                            </div>
                        </div>
                    </div>
                )
            }
        } else { // stat = 2
            if(this.state.offer_status === "2") {
                if (this.state.motuser_id === this.state.myid) {
                    return ( // seller
                        <div>
                            <h6>Статус сделки: Подтвержденная</h6>
                            <div className="alert small alert-warning">Внимание! После нажатия кнопки продаю, вы получите код подтверждения.
                            Не сообщайте его до подписания договора купли-продажи
                            </div>
                            <div className="small">
                                <div className="btn btn-sm btn-outline-danger" onClick={this.deleteOffer}>
                                    Не продаю
                                </div>
                                <div className="btn btn-sm btn-outline-success" onClick={this.getCode}>
                                    Продаю
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <h6>Статус сделки: Подтвержденная</h6>
                            <div className="alert small alert-warning">Внимание! Не вводите код, сообщенный продавцом до заключения
                            договора купли-продажи.
                            </div>
                            <div className="small">
                                <div className="btn btn-sm btn-outline-danger" onClick={this.deleteOffer}>
                                    Не покупаю
                                </div>
                                <div className='dropdown-divider'/>
                                <form className="form-inline" onSubmit={this.checkCodeAndBy}>
                                    <div className="form-group mx-sm-3 mb-2">
                                        <label htmlFor="inputPassword2" className="sr-only">Код подтверждения</label>
                                        <input type="text" className="form-control" id="inputPassword2"
                                               placeholder="3х значный код"
                                               value={this.state.entered_code}
                                               onChange={this.enteredCodeHandler}
                                        />
                                        <button className="btn btn-sm btn-outline-success">
                                            Подтверждаю
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            } else { // stat 3
                if(this.state.motuser_id === this.state.myid){
                    return( // seller
                        <div className="alert alert-danger">
                            <div>Статус сделки: Отклонено</div>
                            <div className="small">
                                <div className="btn btn-sm btn-outline-danger"  onClick={this.deleteOffer}>
                                    Удалить
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <div className="alert alert-danger"> Статус сделки: Отклонено</div>
                            <div className="small">
                                <div className="btn btn-sm btn-outline-danger" onClick={this.deleteOffer}>
                                    Удалить
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        }
    }
}

export default ChangeOfferStatus;