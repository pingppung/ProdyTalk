import React,{useEffect} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Message from "../components/chat/Message.js";
import LeftMessage from "../components/chat/LeftMessage.js";

function Chat() {

    const sock = new SockJS('http://localhost:8080/chat')
    const client=Stomp.over(sock);

    const [userId,setUserId]=useState("");
    const [messageId,setMessageId]=useState(0);
    const [message,setMessage]=useState(null);
    const [children, setChildren]=useState([]);
    const [id,setId]=useState("");
    const [chatMessage,setchatMessage] = useState("");
    const [toId, setToId]=useState("");
    const [changeNum,setchangeNum]=useState(1);

    const changeId = (e) => {
        setId(e.target.value);
       };

    const changeMessage = (e) => {
        setchatMessage(e.target.value);
        };
    const changeToId = (e) => {
        setToId(e.target.value);
        };

    useEffect(()=>{
        client.connect({}, () =>{
            client.subscribe('/queue/addChatToClient/'+id, (messageVO) => {
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
    }, [changeNum])


    const onChatMessage = () => {
        client.send("/app/join",{},JSON.stringify({'user_id':id}))
        client.send(`/app/chat/${toId}`,{},JSON.stringify({'user_id':id, 'content':chatMessage}))

         setChildren([
                            ...children,
                            <Message id={id} content={chatMessage} />,
                            <br />

                        ])

    }

    useEffect(() => {
        if(userId!=null&&message!=null){
            setChildren([
                ...children,
                <LeftMessage userId={userId} content={message} />,
                <br />
            ])
        }

    },[messageId])

    const onConnect = () => {
        setchangeNum(changeNum+1)
    }


    return (
        <div id="main-content" className="container">
            <div className="row">
                <div className="col-md-6">
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="id">What is your name?</label>
                            <input onChange={changeId} value={id} placeholder="Your name here..." />
                            <button onClick={onConnect} type="button">Connect</button>
                        </div>
                        <div className="form-group">
                            <label>Input Message</label>
                            <input onChange={changeMessage} value={chatMessage} placeholder="message.." />
                        </div>
                        <div className="form-group">
                            <label>Input to Who?</label>
                            <input onChange={changeToId} value={toId} placeholder="message.." />
                        </div>
                        <button onClick={onChatMessage} className="btn btn-default" type="button">Chat Send</button>
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