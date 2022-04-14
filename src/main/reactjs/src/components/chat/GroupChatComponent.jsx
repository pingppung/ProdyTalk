import React,{useEffect} from 'react';
import {useState} from 'react';
import {Button} from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Message from "./Message.js";
import LeftMessage from "./LeftMessage.js";
import Connected from "./Connected";
import ChatService from "../../service/ChatService.js";
import CircularProgress from '@mui/material/CircularProgress';
import '../css/Chat.css';

function Chat(props) {

    const sock = new SockJS('http://localhost:8080/chat')
    //const sock = new SockJS('https://pingppung.xyz:3000/chat')
    const client=Stomp.over(sock);

    const [id,setId]=useState(null);
    const [userId,setUserId]=useState("");
    const [messageId,setMessageId]=useState(0);
    const [message,setMessage]=useState(null);
    const [children, setChildren]=useState([]);
    const [chatMessage,setchatMessage] = useState("");
    const [changeNum,setChangeNum]=useState(1);

    const changeMessage = (e) => {
        setchatMessage(e.target.value);
        }; //input 입력시 chatMessage state 변경

    const onChangeNum = () => {
        setChangeNum(changeNum+1)
    }

    const waitForConnection = (client, callback) => {
        setTimeout(() => {
            if(client.ws.readyState === 1) callback()
            else waitForConnection(client,callback)
        }, 1)
    }

    useEffect(()=>{
        ChatService.getUserName().then(res => {
            setId(res.data.id) //id에 token id 넣기'
        })

        client.connect({}, () =>{
            client.subscribe('/queue/addChatToClient/group/'+props.id, (messageVO) => { //
                setUserId(JSON.parse(messageVO.body).user_id)
                setMessage(JSON.parse(messageVO.body).content)
                setMessageId(JSON.parse(messageVO.body).message_id)
            })
        })

        return () => {
            client.disconnect(()=>{
                client.unsubscribe('sub-0');
            })
        }
    }, []) //conversationId가 변경될때 한번만 실행하도록 버튼을 누르면 changeNum이 변하도록 함

    useEffect(() => {
        if(id!=null){
            setChildren([
                ...children,
                <Connected id={id} />
            ])
        }else {
            <CircularProgress />
        }
    },[id])


    const onChatMessage = () => {
        waitForConnection(client,function() {
            client.send(`/app/chat/group/${props.id}`,{},JSON.stringify({'user_id':id, 'content':chatMessage}))
            //conversationId로 메세지를 보내면서, user_id와 content를 포함
            setChildren([
                ...children,
                <Message id={id} content={chatMessage} />, //보냄과 동시에 화면에 내가보낸 메시지 내용 오른쪽에 표시
                <br />
            ])
        })

    }

    useEffect(() => {
        if(userId!=null&&message!=null){
            if(userId!=id){
                setChildren([
                    ...children,
                    <LeftMessage userId={userId} content={message} />, //메시지가 오면 왼쪽에 표시
                    <br />
                ])
            }
        }

    },[messageId])


    return (
        <div id="main-content" className="container">
            <div className="row">
                <div className="col-md-6">
                    <div id="chatList">
                        {children.map(child => child)}
                    </div>
                    <div id="inputMessage">
                        <label>메시지 입력</label>
                        <input onChange={changeMessage} value={chatMessage} placeholder="message.." />
                        <Button variant="contained" color="primary" onClick={onChatMessage}>보내기</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;