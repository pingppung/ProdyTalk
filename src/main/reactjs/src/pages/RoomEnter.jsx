import React, { useState, Component } from 'react';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import ChatPage from './ChatPage';
import FileComponent from '../components/room/FileComponent'
import Calendar from './Calendar.js';
import {Button} from '@material-ui/core';
import './css/RoomEnter.css';

function RoomEnter() {

    const location=useLocation()
    const id=location.state
    const [chat,setChat]=useState(false)
    const [calendar,setCalendar]=useState(false)
    const [file,setFile]=useState(false)

    const onChat = () => {
        if(chat===false){
            setChat(true)
            setCalendar(false)
            setFile(false)
        }else {
            setChat(false);
        }
    }

    const onCalendar = () => {
        if(calendar==false){
            setCalendar(true)
            setChat(false)
            setFile(false)
        }else{
         setCalendar(false)
        }
    }

    const onFile = () => {
        if(file==false){
            setFile(true)
            setCalendar(false)
            setChat(false)
        }else{
            setFile(false)
        }
    }

    console.log(`${id}번 방입니다!`)


    return(
        <div>
            <Button>프로젝트 정보</Button>
            <Button variant="contained" color="primary" onClick={onCalendar}>팀별 캘린더</Button>
            <Button variant="contained" color="primary" onClick={onFile}>파일공유</Button>
            <Button>화상채팅</Button>
            <Button variant="contained" color="primary" onClick={onChat}>그룹채팅</Button>
            {file && <FileComponent roomId={id} />}
            {chat && <ChatPage id={id}/>}
            <div className="calendar">
                {calendar && <Calendar roomId={id}/>}
            </div>
        </div>
    )
}

export default RoomEnter