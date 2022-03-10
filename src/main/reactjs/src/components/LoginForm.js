import React from 'react';

function LoginForm({ user_id, user_pwd, onChange, onCreate }) {
    return (
        <div>
            <form className="container" action="/login" method="post">
                 <div>
                     <label>아이디</label>
                     <input
                        type="text"
                        name="user_id"
                        placeholder="유저 아이디"
                        onChange={onChange}
                        value={user_id}

                     />
                 </div>

                 <div>
                     <label>비밀번호</label>
                     <input
                        type="text"
                        name="user_pwd"
                        placeholder="유저 비밀번호"
                        onChange={onChange}
                        value={user_pwd}
                     />
                 </div>
                 <div className="btn">
                     <button type="submit">로그인</button>
                 </div>
            </form>
        </div>
    );
}

export default LoginForm;