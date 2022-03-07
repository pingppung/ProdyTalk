import React from 'react';
import './css/Login.css';

function Login() {
    return (
        <body>
            <form className="container" action="/login" method="post">
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
        </body>
    );
}

export default Login;