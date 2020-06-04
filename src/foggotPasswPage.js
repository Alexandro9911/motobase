import React, {Component} from "react";

class FoggotPassw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            telephone: '',
            fio: '',
            stat: 0
        }
        this.handlerSbm = this.handlerSbm.bind(this);
        this.handlerProve = this.handlerProve.bind(this);
        this.handlerNotMy = this.handlerNotMy.bind(this);
    }

    handlerSbm() {
        this.setState({stat: 1});
    }

    handlerProve() {
        this.setState({stat: 2});
    }

    handlerNotMy() {
        this.setState({stat: 3});
    }

    render() {
        switch (this.state.stat) {
            case 0: {
                return (
                    <div>
                        <h3>Ввод телефона и фио учетной записи</h3>
                        <button className="btn btn-sm btn-outline-secondary" onClick={this.handlerSbm}>Отправка
                            запроса
                        </button>
                    </div>
                )
            }
            case 1: {
                return (
                    <div>
                        <h3>Вывод *** емаил</h3>
                        <h3>Это ваше?</h3>
                        <button className="btn btn-sm btn-outline-secondary" onClick={this.handlerProve}>Да</button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={this.handlerNotMy}>Нет</button>
                    </div>
                )
            }
            case 2: {
                return (
                    <div>
                        <h3>Вам отпрвлено письмо</h3>
                    </div>
                )
            }
            case 3: {
                return (
                    <div>
                        <h3>Хз че делать</h3>
                    </div>
                )
            }
        }
    }
}

export default FoggotPassw;