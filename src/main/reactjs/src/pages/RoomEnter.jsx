import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import GroupChatComponent from '../components/chat/GroupChatComponent';
import FileComponent from '../components/room/FileComponent'
import InfoComponent from '../components/room/InfoComponent'
import Calendar from './Calendar';
import Header from '../components/HeaderComponent'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {Button} from '@material-ui/core';
import base64 from 'base-64';
import './css/RoomEnter.css';

function RoomEnter() {

    const location=useLocation()
    const id=location.state
    const [chat,setChat]=useState(false)
    const [calendar,setCalendar]=useState(false)
    const [file,setFile]=useState(false)
    const [link,setLink]=useState(false)
    const [info,setInfo]=useState(false)
    const [value, setValue] = useState(0);
    const [buttonText,setButtonText]=useState("코드 보기")
    const inviteLink = "/api/enterRoom?roomId="+id
    const encodeLink = base64.encode(inviteLink)

    useEffect(() => {
        if(value == 0){
            setInfo(true)
            setCalendar(false)
            setFile(false)
            setChat(false)
        }else if(value == 1){
            setInfo(false)
            setCalendar(true)
            setFile(false)
            setChat(false)
        }else if(value == 2) {
            setInfo(false)
            setCalendar(false)
            setFile(true)
            setChat(false)
        }else if(value == 3){
            setInfo(false)
            setCalendar(false)
            setFile(false)
            setChat(true)
        }
    },[value])


    const onCopy = () => {
        if(buttonText==="코드 보기"){
            setLink(true)
            setButtonText("코드 복사")
        }
        else if(buttonText==="코드 복사"){
            navigator.clipboard.writeText(encodeLink)
            window.alert("코드가 복사되었습니다!")
        }
    }

    console.log(`${id}번 방입니다!`)


    return(
        <div className="roomEnterBack">
            <Header />
            <div id="inviteLink">
                {link && encodeLink}
                <Button variant="contained" color="primary" onClick={onCopy}>{buttonText}</Button>
            </div>

            <Box sx={{ width: 1000, marginLeft:55, marginTop: 5 }}>
                  <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  >
                    <BottomNavigationAction label="프로젝트/스터디 정보" />
                    <BottomNavigationAction label="캘린더" />
                    <BottomNavigationAction label="파일 공유"  />
                    <BottomNavigationAction label="그룹 채팅"  />
                    <BottomNavigationAction label="화상 채팅"  />
                  </BottomNavigation>
            </Box>

            <div id="menu">
                <div className="menuitem">
                    {file && <FileComponent roomId={id} />}
                    <div className="chat">
                        {chat && <GroupChatComponent id={id}/>}
                    </div>
                    {info && <InfoComponent roomId={id} />}
                </div>
                <div className="calendar">
                    {calendar && <Calendar roomId={id}/>}
                </div>
            </div>


        </div>
    )
}

export default RoomEnter