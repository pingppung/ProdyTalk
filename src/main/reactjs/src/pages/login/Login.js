import React from 'react';
import './Login.css';
function Login() {
    return (
        <div className="login_form">
            <form className="container" action="/login/test" method="post">
                 <div>
                     <label>아이디</label>
                     <input type="text" name="user_id"></input>
                 </div>

                 <div>
                     <label>비밀번호</label>
                     <input type="text"name="user_pwd"></input>
                 </div>

                 <div className="btn">
                     <button type="submit">Submit</button>
                 </div>
            </form>
        </div>
    );
}

export default Login;