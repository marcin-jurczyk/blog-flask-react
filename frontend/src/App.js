import React from "react";
import {Router} from "react-router-dom";
import {history} from "./services/history";
import {loginAutomatically} from "./services/user";
import {Routing} from "./Routing";
import './App.css';

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
