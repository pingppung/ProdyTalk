import React,{useEffect} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Message from "../components/chat/Message.js";
import LeftMessage from "../components/chat/LeftMessage.js";
import ChatService from "../service/ChatService.js";

function Chat() {

    const sock = new SockJS('http://localhost:8080/chat')
    const client=Stomp.over(sock);

    const [id,setId]=useState("");
    const [userId,setUserId]=useState("");
    const [messageId,setMessageId]=useState(0);
    const [message,setMessage]=useState(null);
    const [children, setChildren]=useState([]);
    const [chatMessage,setchatMessage] = useState("");
    const [conversationId, setConversationId]=useState("");
    const [changeNum,setChangeNum]=useState(1);


    const changeMessage = (e) => {
        setchatMessage(e.target.value);
        }; //input 입력시 chatMessage state 변경

    const changeConversationId = (e) => {
        setConversationId(e.target.value);
        }; //input 입력시 conversationId state 변경

    const onChangeNum = () => {
        setChangeNum(changeNum+1)
    }



    useEffect(()=>{
        ChatService.getUserName().then(res => {
            console.log(res.data.id);
            setId(res.data.id) //id에 token id 넣기
        });
        client.connect({}, () =>{
            client.subscribe('/queue/addChatToClient/'+conversationId, (messageVO) => { //
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
    }, [changeNum]) //conversationId가 변경될때 한번만 실행하도록 버튼을 누르면 changeNum이 변하도록 함


    const onChatMessage = () => {
        console.log(id)
        client.send(`/app/chat/${conversationId}`,{},JSON.stringify({'user_id':id, 'content':chatMessage}))
        //conversationId로 메세지를 보내면서, user_id와 content를 포함
         setChildren([
                            ...children,
                            <Message id={id} content={chatMessage} />, //보냄과 동시에 화면에 내가보낸 메시지 내용 오른쪽에 표시
                            <br />

                        ])

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
                    <form className="form-inline">

                        <div className="form-group">
                            <label>구독할 채팅방 이름</label>
                            <input onChange={changeConversationId} value={conversationId} placeholder="chatRoom.." />
                            <button onClick={onChangeNum} className="btn btn-default" type="button">등록</button>
                        </div>

                        <div className="form-group">
                            <label>메시지 입력</label>
                            <input onChange={changeMessage} value={chatMessage} placeholder="message.." />
                            <button onClick={onChatMessage} className="btn btn-default" type="button">보내기</button>
                        </div>
                    </form>
                    <div className="box-container">
                        {children.map(child => child)}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Chat;