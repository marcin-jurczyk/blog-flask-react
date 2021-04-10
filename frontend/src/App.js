import './App.css';
import {Route, Router} from "react-router-dom";
import {history} from "./services/history";
import {loginAutomatically, UserContext} from "./services/user";
import {Routing} from "./Routing";
import React, {useMemo, useState} from "react";

if (loginAutomatically()) {
    history.push('/')
}

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Routing/>
            </Router>
        </div>
    );
}

export default App;
