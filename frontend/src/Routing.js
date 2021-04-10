import React, {useMemo, useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import {Home} from "./components/Home/Home";
import {Login} from "./components/Auth/Login/Login";
import {SignUp} from "./components/Auth/SignUp/SignUp";
import {AddPost} from "./components/AddPost/AddPost";
import {UserContext} from "./services/UserContext";

export const Routing = () => {

    const [user, setUser] = useState(null);
    const value = useMemo(() => ({ user, setUser }), [user, setUser])

    return (
        <>
            <Switch>
                <UserContext.Provider value={value}>
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
                </UserContext.Provider>
            </Switch>
        </>
    )
}