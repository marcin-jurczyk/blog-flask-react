import React from 'react';
import {Menu} from "antd";
import {Link, useHistory} from "react-router-dom";
import {logout} from "../../services/user";
import {HomeOutlined} from "@ant-design/icons"
import './layout.css'


export const NavBarLogged = () => {
    const history = useHistory();

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
                {/*{getAvatar()}*/}
                Logout
            </Menu.Item>
        </Menu>
    );
};
