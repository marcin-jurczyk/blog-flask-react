import React, {useContext} from 'react'
import {Logged} from "../../views/Logged";
import {UserContext} from "../../services/UserContext";

export const AddPost = () => {

    const {user, setUser} = useContext(UserContext)

    return (
        <Logged>
            <div>
                <h1>Add post </h1>
                    {JSON.stringify(user)}
            </div>
        </Logged>
    )
}