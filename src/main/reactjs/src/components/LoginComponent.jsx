import React, { Component } from 'react';
import UserService from '../service/UserService'
import { Link } from "react-router-dom";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './css/Login.css';

//function LoginForm({ user_id, user_pwd, onChange,onCreate }) {
class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            user_pwd: '',
        }

        this.handleIdChange = this.handleIdChange.bind(this)
        this.handlePwdChange = this.handlePwdChange.bind(this)
    }
    handleIdChange = (event) => {
        this.setState({ user_id: event.target.value });
    }
    handlePwdChange = (event) => {
        this.setState({ user_pwd: event.target.value })
    }
    gotoHome = (event) => {
            event.preventDefault();
            let User = {
                user_id: this.state.user_id,
                user_pwd: this.state.user_pwd
            };
            axios
                  .post("/authenticate", User)
                  .then((response) => {
                    console.log(response);
                    console.log(response.data);
                    UserService.fetchToken(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    this.props.history.push("/main");
                  })
                  .catch((error) => {
                    console.log("error");
                    window.alert("아이디나 비밀번호가 다릅니다")
                  });

        }
    render(){
        return (
            <div className="form">
                <form>
                <h1 className="loginText">
                    로그인
                </h1>
                <div>
                    <div className="login">
                        <label>아이디</label>
                    </div>
                    <div className="loginField">
                        <input type="text"
                            required="required"
                            autofocus="autofocus"
                            name="user_id"
                            placeholder="  아이디"
                            onChange={this.handleIdChange}
                        />
                    </div>

                    <div className="password">
                        <label>비밀번호</label>
                    </div>
                    <div className="passwordField">
                        <input type="text"
                            required="required"
                            name="user_pwd"
                            placeholder="  비밀번호"
                            onChange={this.handlePwdChange}
                        />
                    </div>

                     <div className="loginBtn">
                         <button type="submit" onClick={this.gotoHome} >로그인 하기</button>
                     </div>

                     <div className="signupBtn">
                         아직 계정이 없으신가요?
                         <a href="/signup">회원 가입</a>

                     <div className="btn">
                         <button type="submit" onClick={this.gotoHome}>로그인</button>
                     </div>
                </div>
                </form>
            </div>
        );
    }
}

export default LoginComponent;