import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Home} from "./components/Home/Home";
import {Login} from "./components/Auth/Login/Login";
import {SignUp} from "./components/Auth/SignUp/SignUp";
import {AddPost} from "./components/AddPost/AddPost";

export const Routing = () => {

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/home">
                    <Home/>
                </Route>
                <Route exact path="/sign-up">
                    <SignUp/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/add_post">
                    <AddPost/>
                </Route>
            </Switch>
        </>
    )
}