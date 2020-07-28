import React from 'react';
import './App.css';
import Navigation from "./components/Navigation";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Inventory from "./components/Inventory";
import Header from "./components/Header";
import MainForm from "./components/MainForm";
import Shopify from "./components/Shopify/Shopify";


function App() {
    return (
        <Router>
            <Navigation/>
            <Header/>
            <Switch>
                <Route path='/' exact component={MainForm}/>
                <Route path='/shopify' exact component={Shopify}/>
                <Route path='/inventory' exact component={Inventory}/>
            </Switch>
        </Router>
    );
}

export default App;
