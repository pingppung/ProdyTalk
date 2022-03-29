import React, { Component } from 'react';
import UserService from '../service/UserService'

class SignupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            user_pwd: '',
            user_name: '',
            user_email: '',
            user_phone: ''
        }

        this.handleIdChange = this.handleIdChange.bind(this)
        this.handlePwdChange = this.handlePwdChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
    }
    handleIdChange = (event) => {
        this.setState({ user_id: event.target.value });
    }
    handlePwdChange = (event) => {
        this.setState({ user_pwd: event.target.value })
    }
    handleNameChange = (event) => {
        this.setState({ user_name: event.target.value });
    }
    handleEmailChange = (event) => {
        this.setState({ user_email: event.target.value });
    }
    handlePhoneChange = (event) => {
        this.setState({ user_phone: event.target.value });
    }
    gotoLogin = (event) => {
        event.preventDefault();
        let User = {
            user_id: this.state.user_id,
            user_pwd: this.state.user_pwd,
            user_name: this.state.user_name,
            user_email: this.state.user_email,
            user_phone: this.state.user_phone
        };
        UserService.Signup(User).then(res => {
            this.props.history.push('/');
            window.alert("회원가입에 성공했습니다")
        });
    }
    render() {
        return (
            <div>
                <form>
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
                     <div>
                         <label>닉네임</label>
                         <input
                            type="text"
                            name="user_name"
                            placeholder="유저 닉네임"
                            onChange={this.handleNameChange}
                         />
                     </div>
                     <div>
                          <label>이메일</label>
                          <input
                             type="text"
                             name="user_email"
                             placeholder="유저 이메일"
                             onChange={this.handleEmailChange}
                          />
                     </div>
                     <div>
                          <label>전화번호</label>
                          <input
                             type="text"
                             name="user_phone"
                             placeholder="유저 전화번호"
                             onChange={this.handlePhoneChange}
                          />
                      </div>
                     <div className="btn">
                         <button type="submit" onClick={this.gotoLogin}>회원가입</button>
                     </div>
                </form>
            </div>
        );
    }
}

export default SignupComponent;