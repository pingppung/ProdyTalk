import {React,useEffect} from 'react';
import {useState} from 'react';
import { Link,withRouter } from "react-router-dom";
import Box from '@mui/material/Box';
import LogoWhite from "../components/image/LogoWhite.png";
import Header from '../components/HeaderComponent'
import Background from '../components/image/background.png'
import Computer from '../components/image/computer.png'
import ChatService from "../service/ChatService.js";
import Button from '@mui/material/Button';
import { pink} from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import {useLocation} from 'react-router-dom';
import './css/firstPage.css';
function FirstPage(props) {

    const [isLogin,setIsLogin] = useState(false)
    const [logout,setLogout] = useState(false)
    const location=useLocation()
    const login=location.state
    const imagestyle = {
             height:550,
             width:550,
             "margin-left": 50,
                 "margin-top": 90,
                 position: "absolute"
            };
    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText("#ffffff"),
      backgroundColor: "#ffffff",
      '&:hover': {
        backgroundColor: pink[100],
      },
    }));

    const onLogout = () => {
        setLogout(true)
        setIsLogin(false)
    }

    useEffect(() => {
        if(login!=null){
            setIsLogin(false)
            console.log(login)}
        else{ setIsLogin(true) }

    },[])

    return (
        <div className="background">
            <div className="logo">
                          ProdyTalk
            </div>
            <img src={Computer} alt="computer" style={imagestyle}/>

            <div className="font">ProdyTalk은 WebRTC 기반 화상채팅 프로젝트/스터디 플랫폼입니다.<br/><br/>
             팀원들과 진행상황들을 공유할 수 있고, <br /> 자기개발을 가능하게해 프로젝트나 스터디를 효율적으로 관리할 수 있습니다.
             </div>
             { isLogin === false
             ? <div className="button">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <ColorButton variant="contained" size="large">
                        <div className="smallfont">로그인</div>
                    </ColorButton>
                </Link>
             </div>
             :<div className="gotomain">
                <div className="button">
                    <Link to="/main" style={{ textDecoration: 'none' }}>
                        <ColorButton variant="contained" size="large">
                            <div className="smallfont">메인으로</div>
                        </ColorButton>
                    </Link>
                </div>

             </div>

             }

        </div>




    );
}

export default withRouter(FirstPage);