import {API, setAuthHeaders} from "./api";
import jwt_decode from 'jwt-decode'
import {message} from "antd";

export const loginAutomatically = () => {
    const token = localStorage.getItem('token');
    if (token === 'undefined') return false;
    if(!token) return false;

    const decoded = jwt_decode(token);
    const now = Date.now()/1000;
    if(decoded.exp > now){
        setAuthHeaders(token);
        return true;
    }

    return false;
};

export const login = (token) => {
    localStorage.setItem('token', token);
    setAuthHeaders(token);
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthHeaders(null);
    window.location.reload();
};

export const getUserInfo = (email) => {
    API.get(`/auth/email/${email}`)
        .then(response => {
            console.log(response.data)
            return response.data;
    }).catch((errInfo) => {
        message.error(errInfo);
    })
}

export const getEmail = () => {
    const token = localStorage.getItem('token');
    if (token === 'undefined') return false;
    if (!token) return false;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).sub;
};