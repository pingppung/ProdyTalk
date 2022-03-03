import React from 'react';
import './Signup.css';

function Signup() {
    return (
        <body>
           <form className="container" action="/signup/result" method="post">
               <div className="mb-3">
                   <label className="form-label">아이디</label>
                   <input type="text" className="form-control" name="user_id"></input>
               </div>
               <div className="mb-3">
                    <label className="form-label">비밀번호</label>
                    <input type="text" className="form-control" name="user_pwd"></input>
               </div>
               <button type="submit" className="btn btn-primary">Submit</button>
           </form>
       </body>
    );
}
export default Signup;