import React from 'react'
import {Button, Form, Input, message} from "antd";
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {API} from "../../../services/api";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {login} from "../../../services/user";
import {NotLogged} from "../../../views/NotLogged";
import {wave} from "../../../services/wave";
import "./layout.css"

const color1 = '#144ec4'
const color2 = '#2dc4f3'

export const Login = () => {
    const history = useHistory();

    const onFinish = values => {
        API.post('/auth/login', {
            email: values.email,
            password: values.password,
        })
            .then((response => {
                login(response.data['Bearer token']);
                history.push('/home')
            }))
            .catch(errInfo => {
                // message.error(errInfo.response.data)
                message.error(`Wrong username or password`)
            })
    };

    return (
        <NotLogged>
            <div className="login-container">
                <div className="form-title">
                    login
                </div>
                <Form
                    name="login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="E-mail"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block="true" className="login-form-button">
                            Login
                        </Button>
                        <div className="link">
                            Or <Link to="/sign-up">register now!</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            {wave(color1, color2, "40%")}
        </NotLogged>
    )
};