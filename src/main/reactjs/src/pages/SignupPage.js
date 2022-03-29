import React from 'react';
import './css/Signup.css';
import Signupform from "../components/SignupForm"

function Signup() {

    return (
        <div>
            <form className="container" action="/signup" method="post">
                 <div>
                     <label>아이디</label>
                     <input
                        type="text"
                        name="user_id"
                        placeholder="유저 아이디"

                     />
                 </div>

                 <div>
                     <label>비밀번호</label>
                     <input
                        type="text"
                        name="user_pwd"
                        placeholder="유저 비밀번호"
                     />
                 </div>
                 <div>
                     <label>닉네임</label>
                     <input
                        type="text"
                        name="user_name"
                        placeholder="유저 닉네임"
                     />
                 </div>
                 <div>
                      <label>이메일</label>
                      <input
                         type="text"
                         name="user_email"
                         placeholder="유저 이메일"
                      />
                 </div>
                 <div>
                      <label>전화번호</label>
                      <input
                         type="text"
                         name="user_phone"
                         placeholder="유저 전화번호"
                      />
                  </div>
                 <div className="btn">
                     <button type="submit">회원가입</button>
                 </div>
            </form>
       </div>
    );
}

export default Signup;