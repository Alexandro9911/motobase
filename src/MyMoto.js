// import React, {Component} from "react";
// import {useRouteMatch} from "react-router-dom";
//
// let q = 0;
// let motocycles = [];
// class  MyMoto extends Component {
//     constructor(props) {
//         super(props);
//         this.getinf = this.getinf.bind(this);
//     }
//
//     async getinf() {
//         let idUser = window.sessionStorage.getItem('id');
//         let answ = '';
//         try {
//             let resp = await window.fetch("http://localhost/motobase/findUserMoto.php", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
//                 },
//                 body: new URLSearchParams({
//                     iduser: idUser
//                 })
//             })
//                 .then(response => response.json())
//                 .then(result => answ = result)
//             if(answ ==='err row' || answ === 'err res'){
//                 alert("Oups thats an error");
//                 window.location.assign('/userpage');
//             } else {
//                 motocycles = Object.values(JSON.parse(JSON.stringify(answ)));
//                 q = motocycles.length;
//             }
//         } catch (e) {
//             console.error('Ошибка:', e);
//         }
//     }
//
//     render() {
//         this.getinf();
//         if (q > 0) {
//             const items = motocycles.map((mot,i) =>
//                 <div key={i}>
//                     <div className="wrapper6">
//                         <div className="card border-dark mb-3">
//                             <div className="card-header">{mot['mark']} {mot['nameMoto']}</div>
//                             <div className="card-body">
//                                 <h5 className="card-title">{mot['type']}</h5>
//                                 <div>vin: {mot['vin']}</div>
//                                 <div>страна: {mot['country']}</div>
//                                 <div>Год выпуска: {mot['year']}</div>
//                                 <div>Кубатура: {mot['cubature']}</div>
//                                 <div className='dropdown-divider'/>
//                                 <div>Описание: {mot['description']}</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             );
//             return (
//                 <div>{Object.values(items)}</div>
//             );
//         } else {
//             return (
//                 <div className="alert alert-info" role="alert">
//                     У вас нет мотоциклов
//                 </div>
//             );
//         }
//     }
// }
//
// export default MyMoto;
