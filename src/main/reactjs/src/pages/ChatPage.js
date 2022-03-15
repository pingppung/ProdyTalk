import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet,HelmetProvider} from "react-helmet-async";

function Chat() {

    return (
        <div id="main-content" className="container">
            <HelmetProvider>
                <Helmet>
                    <script src="/webjars/jquery/3.1.0/jquery.min.js"></script>
                    <script src="/webjars/sockjs-client/1.0.2/sockjs.min.js"></script>
                    <script src="/webjars/stomp-websocket/2.3.3/stomp.min.js"></script>
                    <script src="/app.js"></script>
                </Helmet>
            </HelmetProvider>
            <div className="row">
                <div className="col-md-6">
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="connect">WebSocket connection:</label>
                            <button id="connect" className="btn btn-default" type="submit">Connect</button>
                            <button id="disconnect" id="disconnect" className="btn btn-default" type="submit" disabled="disabled">Disconnect
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="name">What is your name?</label>
                            <input type="text" id="name" className="form-control" placeholder="Your name here..." />
                        </div>
                        <div className="form-group">
                            <label>Input Message</label>
                            <input type="text" id="chatMessage" className="form-control" placeholder="message.." />
                        </div>
                        <button id="chatSend" className="btn btn-default" type="button">Chat Send</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table id="conversation" className="table table-striped">
                        <thead>
                        <tr>
                            <th>Greetings</th>
                        </tr>
                        </thead>
                        <tbody id="greetings">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Chat;