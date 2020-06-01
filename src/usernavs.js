import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useRouteMatch} from "react-router-dom";
import './App.css'
import UserInfo from "./userinfo";

export default function UserNavs() {
    let match = useRouteMatch();
    return (
        <div>
            <UserInfo/>
            <ul><Link className="btn btn-outline-secondary btn-block" onClick={handlGarageOnClick} to={`${match.url}/mygarage`}>Мой гараж</Link></ul>
            <ul><Link className="btn btn-outline-secondary btn-block" to={`${match.url}/store`}>Поиск обьявлений</Link></ul>
            <ul><Link className="btn btn-outline-secondary btn-block" onClick={handlSavesOnClick} to={`${match.url}/saves`}>Избранные объявления</Link></ul>
            <ul><Link className="btn btn-outline-secondary btn-block" to={`${match.url}/settings`}>Настройки профиля</Link></ul>
            <ul><Link onClick={function () {
                window.sessionStorage.clear()
            }} className="btn btn-outline-danger btn-block" to={`/loginpage`}>Выйти</Link></ul>
        </div>
    );
}

async function handlSavesOnClick(){
    let idUser = window.sessionStorage.getItem('id');
    let answ = '';
    try {
        let resp = await window.fetch("http://localhost/motobase/findUserSaves.php", {
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
            window.location.assign('/saves');
        } else {
            window.location.reload();
            window.sessionStorage.setItem("saves",JSON.stringify(answ));
        }
    } catch (e) {
        console.error('Ошибка:', e);
    }
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