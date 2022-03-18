import React, { Component } from 'react';
import UserService from '../service/UserService'
import { Link } from "react-router-dom";
import axios from 'axios';

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
                  .post('/authenticate', User)
                  .then((response) => {
                    console.log(response.data.jwt);
                    UserService.fetchToken(response.data.jwt);
                    localStorage.setItem("user", JSON.stringify(response.data.jwt));
                    this.props.history.push("/");
                  })
                  .catch((error) => {
                    console.log("error");
                    window.alert("아이디나 비밀번호가 다릅니다")
                  });
        }
    render(){
        return (
            <div>
                <form action="/authenticate" method="post">
                     <div>
                         <label>아이디</label>
                         <input
                            type="text"
                            name="user_id"
                            placeholder="유저 아이디"
                            onChange={this.handleIdChange}

                         />
                     </div>

                     <div>
                         <label>비밀번호</label>
                         <input
                            type="text"
                            name="user_pwd"
                            placeholder="유저 비밀번호"
                            onChange={this.handlePwdChange}
                         />
                     </div>
                     <div className="btn">
                         <button type="submit">로그인</button>
                         <Link to="/signup"><button>회원가입</button></Link>
                     </div>
                </form>
            </div>
        );
    }
}

export default LoginComponent;