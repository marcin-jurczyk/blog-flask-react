import React, {useContext, useEffect} from 'react';
import {Menu} from "antd";
import {Link, useHistory} from "react-router-dom";
import {getEmail, logout, UserContext} from "../../services/user";
import {HomeOutlined} from "@ant-design/icons"
import './layout.css'
import {API} from "../../services/api";
import SubMenu from "antd/es/menu/SubMenu";


export const NavBarLogged = () => {

    const history = useHistory();

    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        async function loadData() {
            const user = await API.get(`/auth/email/${getEmail()}`)
            setUser(user.data);
        }

        loadData().then(/* do nothing */);
    }, [setUser])

    const getAvatar = () => {
        let url = user.avatar_url
        return (
            <img src={url} alt="avatar" style={{
                background: "yellow",
                borderRadius: 15,
                width: 30,
                height: 30
            }}/>
        )
    };

    const handleLogout = () => {
        logout();
        history.push('/')
    };

    const handleUserItem = () => {
        return (
            user.username ? (
                    <>
                        {user.username}
                        {' '}
                        {getAvatar()}
                    </>
                ) :
                <></>
        )
    }

    return (
        <Menu
            className="menu"
            theme="light"
            mode="horizontal"
        >
            <Menu.Item className={"home-page"}>
                <Link to="home"><HomeOutlined/>Home Page</Link>
            </Menu.Item>
            <Menu.Item className={"add-post"}>
                <Link to="add_post">Add post</Link>
            </Menu.Item>
            <SubMenu title={handleUserItem()} className="submenu">
                <Menu.Item onClick={() => handleLogout()} >
                    Logout
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
}