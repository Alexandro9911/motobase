import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, useRouteMatch} from "react-router-dom";
import {Switch} from "react-router-dom";
import {Route} from 'react-router-dom'
import './App.css'

export default function UserNavs() {
    let match = useRouteMatch();
    return (
        <div>
            <h4>this is the place for user navs</h4>
            <ul><Link to={`${match.url}/saves`}>Saves</Link></ul>
            <ul><Link to={`${match.url}/mygarage`}>Garage</Link></ul>
            <ul><Link to={`${match.url}/store`}>Store</Link></ul>
        </div>
    );
}

