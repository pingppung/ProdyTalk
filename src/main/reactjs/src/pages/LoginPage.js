import React, { useState, useEffect } from 'react';
import './css/Login.css';
import LoginComponent from "../components/LoginComponent"
import { Link } from "react-router-dom";
//import UserService from '../service/UserService';

function Login() {
    const [inputs, setInputs] = useState({
            user_id: '',
            user_pwd: '',
    });

    const { user_id, user_pwd } = inputs;


    const onChange = e => {

        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const [users, setUsers] = useState([
    ]);

    const onCreate = () => {
        const user = {
            user_id,
            user_pwd,
        };

        setUsers(users.concat(user));

        setInputs({
            user_id: '',
            user_pwd: '',
        });
    };

//    useEffect(() => {
//        fetch('/login')
//          .then(response => console.log(response.text()));
//    },[])
    return (
        <div>
            <LoginComponent
                user_id={user_id}
                user_pwd={user_pwd}
                onChange={onChange}
                onCreate={onCreate}
            />
            <Link to="/signup"><button>회원가입</button></Link>
        </div>
    );
}

export default Login;