import React from 'react';
import './Signup.css';

function Signup() {
    return (
        <body>
           <form className="container" action="/signup/result" method="post">
               <div>
                   <label>아이디</label>
                   <input type="text" name="user_id"></input>
               </div>

               <div>
                    <label>비밀번호</label>
                    <input type="text"name="user_pwd"></input>
               </div>
               <div>
                    <label>닉네임</label>
                    <input type="text"name="user_name"></input>
               </div>
               <div>
                    <label>이메일</label>
                    <input type="text"name="user_email"></input>
               </div>
               <div>
                    <label>전화번호</label>
                    <input type="text"name="user_phone"></input>
               </div>
               <div className="btn">
                    <button type="submit">Submit</button>
               </div>
           </form>
       </body>
    );
}
export default Signup;