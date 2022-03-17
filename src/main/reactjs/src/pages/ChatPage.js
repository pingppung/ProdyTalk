import React,{useEffect} from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function Chat() {

    const [name,setName]=useState("");
    const [chatMessage,setchatMessage] = useState("");
    const [toName, settoName]=useState("");
    const sock = new SockJS('http://localhost:8080/chat')
    const client=Stomp.over(sock);
    const [changeNum,setchangeNum]=useState(1);

    const changeName = (e) => {
        setName(e.target.value);
       };

    const changeMessage = (e) => {
        setchatMessage(e.target.value);
        };
    const changeToName = (e) => {
        settoName(e.target.value);
        };

    useEffect(()=>{
        client.connect({}, () =>{
            client.subscribe('/queue/addChatToClient/'+name, function(messageVO){
                                                   const message=JSON.parse(messageVO.body)
                                                   console.log(message.content)
                                               })
        })
        return () => {
            client.disconnect(()=>{
                client.unsubscribe('sub-0');
            })
        }
    }, [changeNum])


    const onChatMessage = () => {
        client.send("/app/join",{},JSON.stringify({'name':name}))
        client.send(`/app/chat/${toName}`,{},JSON.stringify({'content':chatMessage}))

    }
    const onConnect = () => {
        setchangeNum(changeNum+1)
    }


    return (
        <div id="main-content" className="container">
            <div className="row">
                <div className="col-md-6">
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="name">What is your name?</label>
                            <input onChange={changeName} value={name} placeholder="Your name here..." />
                            <button onClick={onConnect} type="button">Connect</button>
                        </div>
                        <div className="form-group">
                            <label>Input Message</label>
                            <input onChange={changeMessage} value={chatMessage} placeholder="message.." />
                        </div>
                        <div className="form-group">
                            <label>Input to Who?</label>
                            <input onChange={changeToName} value={toName} placeholder="message.." />
                        </div>
                        <button onClick={onChatMessage} className="btn btn-default" type="button">Chat Send</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Chat;