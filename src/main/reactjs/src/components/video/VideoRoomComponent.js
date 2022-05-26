import React, { Component } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import MemberListComponent from './MemberList';
import UserService from '../../service/UserService';
import VideoService from '../../service/VideoService';
import Logo from '../image/LogoWhite.png';
import { UserOutlined, AudioOutlined, AudioMutedOutlined, SoundOutlined, ExportOutlined, VideoCameraFilled
        ,LaptopOutlined, SettingFilled, TeamOutlined, AppstoreOutlined, BorderOutlined} from '@ant-design/icons';
import { Avatar } from 'antd';
import '../css/Video.css';
const OPENVIDU_SERVER_URL = 'https://prody.xyz:4443';
//const OPENVIDU_SERVER_URL = 'https://localhost:4443';
const OPENVIDU_SERVER_SECRET = '12341234';



class VideoRoomComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'MySessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],
            videoDeviceID: undefined,
            audioDeviceID: undefined,
            videoDevices: [],
            audioDevices: [],
            videoEnable: true,
            audioEnable: true,
            shareEnable: false,
            memberlistEnable: false,
            layoutState: 'Focus',
            audioState: 'UnMuteAudio',
            videoState: 'OnVideo',
            shareState: 'NotShare',
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.onoffVideo = this.onoffVideo.bind(this);
        this.muteAudio = this.muteAudio.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.memberList = this.memberList.bind(this);
        this.changeLayout = this.changeLayout.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
    }
    componentDidMount() {    //여기서 setting페이지에서 설정한 값들 가져오기   videoEnable, audioEnable, mySessionId, myUserName, videoDeviceID, audioDeviceID
        this.setState({
            myUserName: this.props.location.props.myUserName,
            mySessionId: this.props.location.props.mySessionId,
            videoEnable: this.props.location.props.videoEnable,
            audioEnable: this.props.location.props.audioEnable,
            videoDeviceID: this.props.location.props.videoDeviceID,
            audioDeviceID: this.props.location.props.audioDeviceID,
        });
        {this.state.audioEnable ?
             this.setState({ audioState: "UnMuteAudio" }) : this.setState({ audioState: "MuteAudio" })
        }
        {this.state.videoEnable ?
            this.setState({ videoState: "OnVideo" }) : this.setState({ videoState: "OffVideo" })
        }
        this.joinSession();
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        console.log("onbeforeunload");
        this.leaveSession();
    }


    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    joinSession() {
        // --- 1) Get an OpenVidu object ---
        this.OV = new OpenVidu();

        let turnUsername = 'twomandarin';
        let turnCredential = '12341234';
        this.OV.setAdvancedConfiguration({
            iceServers: [
                {
                    urls: 'turn:prody.xyz:3478?transport=tcp',
                    //urls: 'turn:localhost:3478?transport=tcp',
                    username: turnUsername,
                    credential: turnCredential
                }
            ]
        });

        // --- 2) Init a session ---
        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---
                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    // 우리가 받은 각각의 새로운 구독자를 array 에 저장
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);
                        console.log(subscriber);
                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {
                    //필요할 때마다 삭제된 모든 구독자를 제거
                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });


                // --- 4) Connect to the session with a valid user token ---

                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken().then((token) => {
                    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession
                        .connect(
                            token,
                            { clientData: this.state.myUserName },
                        )
                        .then(async () => {
                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');

                            // --- 5) Get your own camera stream ---
                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = this.OV.initPublisher(undefined, {
                                //audioSource: undefined, // The source of audio. If undefined default microphone
                                audioSource: this.state.audioDeviceID,
                                //videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                                videoSource: this.state.videoDeviceID,
                                publishAudio: this.state.audioEnable, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: this.state.videoEnable, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---
                            mySession.publish(publisher);

                            // Set the main video in the page to display our webcam and store our Publisher
                            this.setState({
                                currentVideoDevice: videoDevices[0],
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
    }
    leaveSession() {

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mainStreamManager: undefined,
            publisher: undefined
        });
        this.props.history.push({
           pathname: `/roomenter/${this.state.mySessionId}`,
           state: `${this.state.mySessionId}`
         });
        //window.location.href =`/roomenter/${this.state.mySessionId}`;
    }

    async switchCamera() {
        try{
            const devices = await this.OV.getDevices();
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if(videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0){
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: this.state.audioEnable,
                        publishVideo: true,
                        mirror: false,
                        resolution: '640x480',
                        insertMode: 'APPEND'
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
                    this.setState({
                        currentVideoDevice: newVideoDevice,
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                    });
                }
            }
          } catch (e) {
            console.error(e);
          }
    }

    muteAudio() {
        if(this.state.audioEnable === true){   //오디오가 켜진 상태에서 음소거 버튼 눌렀을 때 => 음소거 상태
            this.state.publisher.publishAudio(false);
            this.setState({
                audioState: "MuteAudio",
                audioEnable: false,
            });
        }
        else{ //오디오가 꺼진 상태에서 음소거 버튼 눌렀을 때 => 음소거 아닌 상태
            this.state.publisher.publishAudio(true);
            this.setState({
                audioState: "UnMuteAudio",
                audioEnable: true,
            });
        }
    }

    onoffVideo() {
        if(this.state.videoEnable === true){   //카메라가 켜진 상태에서 카메라 끄기 버튼 눌렀을 때 => 카메라 off
            this.state.publisher.publishVideo(false);
            this.setState({
                videoState: "OffVideo",
                videoEnable: false,
            });
        }
        else{  //카메라가 꺼진 상태에서 카메라 켜기 버튼 눌렀을 때 => 카메라 on
            this.state.publisher.publishVideo(true);
            this.setState({
                videoState: "OnVideo",
                videoEnable: true,
            });
        };
    }

    async screenShare() {
        var videMode = null;
        var videoDevices;
        if(this.state.shareEnable === false){
            this.videoMode = "screen";
            this.setState({
                shareState: "Share",
                shareEnable: true,
            });
        }
        else{
            var devices = await this.OV.getDevices();
            this.videoDevices = devices.filter(device => device.kind === 'videoinput');
            this.videoMode = this.videoDevices[0].deviceId;
            this.setState({
                shareState: "NotShare",
                shareEnable: false,
            });
        }

        try{
            // Creating a new publisher with specific videoSource
            // In mobile devices the default and first camera is the front one
            var sharePublisher = this.OV.initPublisher(undefined, {
                videoSource: this.videoMode,
                publishAudio: true,
                publishVideo: true,
                mirror: false,
                resolution: '640x480',
                insertMode: 'APPEND',
            });

            sharePublisher.once("accessAllowed", () => {
                this.state.session.unpublish(this.state.mainStreamManager)

                this.state.session.publish(sharePublisher)
                this.setState({
                    mainStreamManager: sharePublisher,
                    publisher: sharePublisher,
                });
            });
            sharePublisher.once('accessDenied', () => {
                console.error('Screen Share: Access Denied');
                this.setState({
                    shareState: "NotShare",
                    shareEnable: false,
                });
            });
            if(this.state.shareEnable === false){
                this.setState({
                    currentVideoDevice: this.videoDevices[0],
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
    memberList() {
        if(this.state.memberlistEnable === true){
            this.setState({
                memberlistEnable: false,
            });
        }
        else{
            this.setState({
                memberlistEnable: true,
            });
        }

    }
    changeLayout() {
        console.log(this.state.layoutState);
        if(this.state.layoutState === 'Focus'){
            this.setState({
                layoutState: 'Grid',
            });
        }
        else{
            this.setState({
                layoutState: 'Focus',
            });
        }

    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;

        return (
            <div className="container">
                {this.state.session !== undefined ? (
                 <div id="videoroom">
                    {this.state.memberlistEnable === true ?(
                        <div className="memberList">
                            {this.state.publisher !== undefined ? (
                                    <div>
                                        <MemberListComponent streamManager={this.state.publisher} />
                                    </div>
                            ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={i}>
                                    <MemberListComponent streamManager={sub} />
                                </div>
                            ))}
                        </div>
                    ): null}
                    <div id="footer">
                        <h1 id="session-title">{mySessionId}</h1>
                            <button
                                id="buttonSwitchCamera"
                                onClick={this.switchCamera}>
                                <span class="button-text">카메라 변경</span>
                                <SettingFilled />
                            </button>
                            <button
                                id={"button" + this.state.audioState}
                                onClick={this.muteAudio}>
                                <span class="button-text">{this.state.audioEnable ? "음소거" : "음소거 해제"}</span>
                                {this.state.audioEnable ? <AudioOutlined /> : <AudioMutedOutlined />}
                            </button>
                            <button
                                id={"button" + this.state.videoState}
                                onClick={this.onoffVideo}>
                                <span class="button-text">{this.state.videoEnable ? "카메라 끄기" : "카메라 켜기"}</span>
                                <VideoCameraFilled />
                            </button>
                            <button
                                id={"button" + this.state.shareState}
                                onClick={this.screenShare}>
                                <span class="button-text">{this.state.videoEnable ? "화면공유" : "화면공유 해제"}</span>
                                <LaptopOutlined />
                            </button>
                            <button
                                id={"button" + this.state.layoutState}
                                onClick={this.changeLayout}>
                                <span class="button-text">{this.state.layoutState === 'Focus' ? "Grid" : "Focus"}</span>
                                {this.state.layoutState === 'Focus' ? <AppstoreOutlined /> : <BorderOutlined /> }
                            </button>
                            <button
                                id="buttonMemberList"
                                onClick={this.memberList}>
                                <span class="button-text">{this.state.memberlistEnable ?  "멤버 목록 숨기기" : "멤버 목록 표시하기"}</span>
                                <TeamOutlined />
                            </button>
                            <button
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}>
                                <span class="button-text">나가기</span>
                                <ExportOutlined />
                            </button>

                        </div>
                        <div className="video-div">
                            {this.state.layoutState === 'Focus' && this.state.mainStreamManager !== undefined ? (
                                <div id="main-video" className="col-md-6">
                                    <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                </div>
                            ) : null}
                            <div id={"video-container-"+this.state.layoutState}>
                                {this.state.publisher !== undefined ? (
                                    <div className="stream-container col-xs-6 publisher" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                        <UserVideoComponent
                                            streamManager={this.state.publisher} />
                                    </div>
                                ) : null}
                                {this.state.subscribers.map((sub, i) => (
                                    <div key={i} className="stream-container col-xs-6 subscribers" onClick={() => this.handleMainVideoStream(sub)}>
                                        <UserVideoComponent streamManager={sub} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}
export default VideoRoomComponent;