import React from 'react';
import './Signup.css';

function Signup() {
    return (
        <>
            <form class="container" action="/" method="post">
                <div class="mb-3">
                    <label class="form-label">아이디</label>
                    <input type="text" class="form-control" name="user_id"></input>
                </div>
                <div class="mb-3">
                    <label class="form-label">비밀번호</label>
                    <input type="text" class="form-control" name="user_pwd"></input>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    );
}

export default Signup;