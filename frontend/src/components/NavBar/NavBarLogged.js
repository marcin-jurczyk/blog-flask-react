import React, {useContext} from 'react';
import {Menu} from "antd";
import {Link, useHistory} from "react-router-dom";
import {logout} from "../../services/user";
import {HomeOutlined} from "@ant-design/icons"

import './layout.css'
import SubMenu from "antd/es/menu/SubMenu";
import {UserContext} from "../../services/UserContext";


export const NavBarLogged = () => {
    const history = useHistory();

    const { user , setUser} = useContext(UserContext)


    const handleLogout = () => {
        logout();
        history.push('/')
    };
    
    const getAvatar = () => {
        let url = localStorage.getItem('avatar')
        return (
            <img src={url} alt="avatar" style={{
                borderRadius: 20,
                width: 40,
                height: 40
            }}/>
        )
    };

    const userName = () => {
        let u = user
        if (u)
            return u.username
        else
            return "NIE ZNALEZIONO USERA"
    }

    return (
        <Menu
            className="menu"
            theme="light"
            mode="horizontal"
        >
            <Menu.Item className={"home-page"}>
                <Link to="home"><HomeOutlined />Home Page</Link>
            </Menu.Item>
            <Menu.Item className={"add-post"}>
                <Link to="add_post">Add post</Link>
            </Menu.Item>
            <Menu.Item onClick={() => handleLogout()} className={"logout"}>
                {getAvatar()}Logout
            </Menu.Item>
            <SubMenu title={userName()} style={{float: 'right'}}>
                <Menu.Item onClick={() => handleLogout()}>
                    Logout
                </Menu.Item>
                <Menu.Item onClick={() => history.push("/changeUsername")}>
                    Change username
                </Menu.Item>
                <Menu.Item onClick={() => history.push("/changePassword")}>
                    Change password
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};
