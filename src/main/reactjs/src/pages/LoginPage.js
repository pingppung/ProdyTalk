import React, {  useState } from 'react';
import './css/Login.css';
import LoginForm from "../components/LoginForm"
import { Link } from "react-router-dom";

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
        window.sessionStorage.setItem('id', user_id);
        window.sessionStorage.setItem('password', user_pwd);

    };
    return (
        <div>
            <LoginForm
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