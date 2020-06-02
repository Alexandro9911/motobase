import React, {Component} from "react";

class NewOffer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            myid : props.myid,
            motoid: props.motoid,
            motuser: props.motuser
        }
    }

    render() {
       return(
           <div>
               <ul>My id: {this.state.myid}</ul>
               <ul>Moto ID: {this.state.motoid}</ul>
               <ul>Holder: {this.state.motuser}</ul>
           </div>
       )
    }
}

export default NewOffer;