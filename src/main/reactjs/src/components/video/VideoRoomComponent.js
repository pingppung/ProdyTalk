import React, { Component } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import UserService from '../../service/UserService';
import Logo from '../image/LogoWhite.png';
import '../css/Video.css';
const OPENVIDU_SERVER_URL = 'https://prody.xyz:4443';
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
            audioText: '음소거',
            videoText: '카메라 끄기',
            shareText: '화면공유',
            videoRef: undefined,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.onoffVideo = this.onoffVideo.bind(this);
        this.muteAudio = this.muteAudio.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.getWebcam = this.getWebcam.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.handleVideoSelect = this.handleVideoSelect.bind(this);
        this.handleAudioSelect = this.handleAudioSelect.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
    }
    componentDidMount() {
        const { params } = this.props.match;
        this.videoRef = React.createRef();

        UserService.getUserName().then(res => {
            this.setState({
                myUserName: res.data.id,
                mySessionId: params.id,
            });
        });

        this.getWebcam((stream) => {
            this.videoRef.current.srcObject = stream;
        };

        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    handleVideoSelect(e) {
        this.setState({
            videoDeviceID: e.target.value,
        });
    }

    handleAudioSelect(e){
        this.setState({
            audioDeviceID: e.target.value,
        });
    }

    getWebcam(callback) {
      try {
        const constraints = {
          'video': true,
          'audio': false,
        }
        navigator.mediaDevices.getUserMedia(constraints)
          .then(callback);
      } catch (err) {
        console.log(err);
        return undefined;
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
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
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

                            console.log(this.state.publisher.publishAudio);
                            console.log(this.state.publisher.publishVideo);
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
    }
    leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mainStreamManager: undefined,
            publisher: undefined
        });

        this.getWebcam((stream => {
            this.videoRef.current.srcObject = stream;
        }));
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
                        publishAudio: true,
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
        if(this.state.audioEnable === true){
            this.state.publisher.publishAudio(false);
            this.setState({
                audioText: "음소거 해제",
                audioEnable: false,
            });
        }
        else{
            this.state.publisher.publishAudio(true);
            this.setState({
                audioText: "음소거",
                audioEnable: true,
            });
        }
    }

    onoffVideo() {
        if(this.state.videoEnable === true){
            this.state.publisher.publishVideo(false);
            this.setState({
                videoText: "카메라 켜기",
                videoEnable: false,
            });
        }
        else{
            this.state.publisher.publishVideo(true);
            this.setState({
                videoText: "카메라 끄기",
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
                shareText: "화면공유 중지",
                shareEnable: true,
            });
        }
        else{
            var devices = await this.OV.getDevices();
            this.videoDevices = devices.filter(device => device.kind === 'videoinput');
            this.videoMode = this.videoDevices[0].deviceId;
            this.setState({
                shareText: "화면공유",
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
            });

            //newPublisher.once("accessAllowed", () => {
            await this.state.session.unpublish(this.state.mainStreamManager)

            await this.state.session.publish(sharePublisher)
            this.setState({
                mainStreamManager: sharePublisher,
                publisher: sharePublisher,
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
                    shareText: "화면공유",
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

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const audioText = this.state.audioText;
        const videoText = this.state.videoText;
        const shareText = this.state.shareText;
        const audioDevices = this.state.audioDevices;
        const videoDevices = this.state.videoDevices;
        return (
            <div className="container">
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="img-div">
                            <img src={Logo} alt="ProdyTalk logo"/>
                        </div>
                        <br />
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p>
                                    <video ref={this.videoRef} autoPlay/>
                                </p>
                                <p>
                                    <label>Camera: </label>
                                    <select value={this.state.videoDeviceID} onChange={this.handleVideoSelect}>
                                        {videoDevices.map((videoDevice, index) => (
                                            <option key={videoDevice.deviceId} value={videoDevice.label}>
                                                {videoDevice.label}
                                            </option>
                                         ))}
                                    </select>
                                </p>
                                <p>
                                    <label>Audio: </label>
                                    <select value={this.state.audioDeviceID} onChange={this.handleAudioSelect}>
                                        {audioDevices.map((audioDevice, index) => (
                                            <option key={audioDevice.deviceId} value={audioDevice.label}>
                                                {audioDevice.label}
                                            </option>
                                         ))}
                                    </select>
                                </p>
                                <p>
                                    <label>Username: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        disabled
                                    />
                                </p>
                                <p>
                                    <label> Session: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        disabled
                                    />
                                </p>
                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" id="buttonJoin" name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                        </div>
                    </div>
                ) : null}
                {this.state.session !== undefined ? (
                 <div id="videoroom">
                    <div id="footer">
                        <h1 id="session-title">{mySessionId}</h1>
                            <input
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="나가기"
                            />
                            <input
                                type="button"
                                id="buttonSwitchCamera"
                                onClick={this.switchCamera}
                                value="카메라 전환"
                            />
                            <input
                                type="button"
                                id="buttonMuteAudio"
                                onClick={this.muteAudio}
                                value={audioText}
                            />
                            <input
                                type="button"
                                id="buttonOnOffVideo"
                                onClick={this.onoffVideo}
                                value={videoText}
                            />
                            <input
                                type="button"
                                id="buttonOnOffVideo"
                                onClick={this.screenShare}
                                value={shareText}
                            />
                        </div>

                        {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                <input
                                    className="btn btn-large btn-success"
                                    type="button"
                                    id="buttonSwitchCamera"
                                    onClick={this.switchCamera}
                                    value="Switch Camera"
                                />
                                <input
                                    className="btn btn-large btn-success"
                                    type="button"
                                    id="buttonMuteAudio"
                                    onClick={this.muteAudio}
                                    value={audioText}
                                />
                                <input
                                    className="btn btn-large btn-success"
                                    type="button"
                                    id="buttonOnOffVideo"
                                    onClick={this.onoffVideo}
                                    value={videoText}
                                />
                                <input
                                    className="btn btn-large btn-success"
                                    type="button"
                                    id="buttonOnOffVideo"
                                    onClick={this.screenShare}
                                    value={shareText}
                                />

                            </div>
                        ) : null}
                        <div id="video-container">
                            {this.state.publisher !== undefined ? (
                                <div className="stream-container col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={i} className="stream-container col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
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