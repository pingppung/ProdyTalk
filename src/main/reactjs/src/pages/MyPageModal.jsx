import React from 'react';
import {useState} from 'react';
import '../components/css/Modal.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const MyPageModal = (props) => {

  // open, close, Modal header 텍스트를 모로부터 받아옴
  const { userId, open, close, add, header,  } = props;

  const [userPwd,setUserPwd] = useState("");
  const [userName,setUserName] = useState("")
  const [userEmail,setUserEmail] = useState("")
  const [userPhone,setUserPhone] = useState("")
  const[changeNum, setChangeNum] = useState(1);

  const changeUserPwd = (e) => {
    setUserPwd(e.target.value);
  }

  const changeUserName = (e) => {
    setUserName(e.target.value);
  }

  const changeUserEmail = (e) => {
    setUserEmail(e.target.value);
  }

  const changeUserPhone = (e) => {
    setUserPhone(e.target.value);
  }
  const addEvent = () => {
    setChangeNum(changeNum+1); // add 버튼 누를 때 마다 changeNum + 1 해주기

    props.propFunction(userId,userPwd,userName,userEmail,userPhone); // 바뀐 값 전달
    setUserPwd("");
    setUserName("");
    setUserEmail("");
    setUserPhone("");
  }

  return (
     // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
          {open ? (
            <section>
              <header>
                {header}
                <button className="close" onClick={close}>
                </button>
              </header>

              <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="taskId" className="col-form-label">아이디</label>
                    <input type="text" className="form-control" value={userId} disabled/>

                    <label htmlFor="taskId" className="col-form-label">비밀번호</label>
                    <input type="text" onChange={changeUserPwd} className="form-control" value={userPwd} id="user_pwd" name="user_pwd"/>

                    <label htmlFor="taskId" className="col-form-label">이름</label>
                    <input type="text" onChange={changeUserName} className="form-control" value={userName} id="user_name" name="user_name"/>

                    <label htmlFor="taskId" className="col-form-label">이메일</label>
                    <input type="text" onChange={changeUserEmail} className="form-control" value={userEmail} id="user_email" name="user_email"/>

                    <label htmlFor="taskId" className="col-form-label">핸드폰</label>
                    <input typ="text" onChange={changeUserPhone} className="form-control" value={userPhone} id="user_phone" name="user_phone"/>

                </div>
              </div>
              <footer>
                <button className="add" onClick={addEvent}>
                  수정
                </button>
                <button className="close" onClick={close}>
                  닫기
                </button>
              </footer>

            </section>
          ) : null}
        </div>
  );
}

export default MyPageModal;