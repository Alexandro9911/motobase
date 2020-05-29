import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, useRouteMatch} from "react-router-dom";
import {Switch} from "react-router-dom";
import {Route} from 'react-router-dom'
import './App.css'
import UserInfo from "./userinfo";

export default function UserNavs() {
    let match = useRouteMatch();
    // background: rgba(179, 58, 54, 0.84)
    return (
        <div>
            <UserInfo/>
            <ul><Link className="btn btn-outline-secondary btn-block" onClick={handlGarageOnClick} to={`${match.url}/mygarage`}>Мой гараж</Link></ul>
            <ul><Link className="btn btn-outline-secondary btn-block" to={`${match.url}/store`}>Поиск обьявлений</Link></ul>
            <ul><Link className="btn btn-outline-secondary btn-block" to={`${match.url}/saves`}>Избранные объявления</Link></ul>
            <ul><Link className="btn btn-outline-secondary btn-block" to={`${match.url}/settings`}>Настройки профиля</Link></ul>
            <ul><Link onClick={function () {
                window.sessionStorage.clear()
            }} className="btn btn-outline-danger btn-block" to={`/loginpage`}>Выйти</Link></ul>
        </div>
    );
}

async function handlGarageOnClick() {
    let idUser = window.sessionStorage.getItem('id');
    let answ = '';
    try {
        let resp = await window.fetch("http://localhost/motobase/findUserMoto.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: new URLSearchParams({
                iduser: idUser
            })
        })
            .then(response => response.json())
            .then(result => answ = result)
        if(answ ==='err row'){
            alert("Oups thats an error");
            window.location.assign('/userpage');
        } else {
            window.location.reload();
           window.sessionStorage.setItem("motocycles",JSON.stringify(answ));
        }
    } catch (e) {
        console.error('Ошибка:', e);
    }
}