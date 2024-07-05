import React, { Component } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import MemberListComponent from './MemberList';
import VideoFilter from './VideoFilter'
import { AudioOutlined, AudioMutedOutlined, ExportOutlined, VideoCameraFilled
        ,LaptopOutlined, SettingFilled, TeamOutlined, AppstoreOutlined, BorderOutlined, SyncOutlined} from '@ant-design/icons';
import '../css/Video.css';
const OPENVIDU_SERVER_URL = 'https://prodytalk.icu:4443';
//const OPENVIDU_SERVER_URL = 'https://localhost:4443';
const OPENVIDU_SERVER_SECRET = '12341234';



class VideoRoomComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'MySessionA',
            mySessionId2: 'MySessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            session2: undefined,
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
            filterURI: undefined,
            filterOpen: false,
            memberlistEnable: false,
            facefilterEnable: false,
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
        this.openFilterModal = this.openFilterModal.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.onpopstate = this.onpopstate.bind(this);
    }
    componentDidMount() {    //여기서 statuscheck페이지에서 설정한 값들 가져오기   videoEnable, audioEnable, mySessionId, myUserName, videoDeviceID, audioDeviceID
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
        window.addEventListener('popstate', this.onpopstate);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        window.removeEventListener('popstate', this.onpopstate);
    }
    componentDidUpdate(_, prevState){
        console.log(prevState.publisher);
        console.log(this.state.publisher);
    }
    onbeforeunload(event) {
        event.preventDefault();
        console.log("onbeforeunload");
        this.leaveSession();
    }
    onpopstate(event) {
        console.log("onpopstate");
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
        this.OV = new OpenVidu();

        let turnUsername = 'twomandarin';
        let turnCredential = '12341234';
        this.OV.setAdvancedConfiguration({
            iceServers: [
                {
                    urls: 'turn:prodytalk.icu:3478?transport=tcp',
                    //urls: 'turn:localhost:3478?transport=tcp',
                    username: turnUsername,
                    credential: turnCredential
                }
            ]
        });

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;
                mySession.on('streamCreated', (event) => {
                    // 우리가 받은 각각의 새로운 구독자를 array 에 저장
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);
                    this.setState({
                        subscribers: subscribers,
                    });

                });
                mySession.on('streamDestroyed', (event) => {
                    //필요할 때마다 삭제된 모든 구독자를 제거
                    this.deleteSubscriber(event.stream.streamManager);
                });

                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                this.getToken().then((token) => {
                    mySession
                        .connect(
                            token,
                            { clientData: this.state.myUserName },
                        )
                        .then(async () => {
                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: this.state.audioDeviceID,
                                videoSource: this.state.videoDeviceID,
                                publishAudio: this.state.audioEnable, 
                                publishVideo: this.state.videoEnable, 
                                resolution: '640x480', 
                                frameRate: 30, 
                                insertMode: 'APPEND', 
                                mirror: false,
                            });

                            publisher.subscribeToRemote(true);
                            mySession.publish(publisher);
                            console.log(publisher);
                            console.log(this.state.subscribers);
                            console.log(mySession);
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
           state: {
                id: `${this.state.mySessionId}`,
                prevPage : 'VideoChat',
           }
         });
    }

    async switchCamera() {
        try{
            const devices = await this.OV.getDevices();
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if(videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0){
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: this.state.audioEnable,
                        publishVideo: true,
                        mirror: false,
                        resolution: '640x480',
                        insertMode: 'APPEND'
                    });

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
        console.log(this.state.publisher);
        console.log(this.state.subscribers);
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
            var sharePublisher = this.OV.initPublisher(undefined, {
                videoSource: this.videoMode,
                publishAudio: true,
                publishVideo: true,
                mirror: false,
                resolution: '640x480',
                insertMode: 'APPEND',
            });

            sharePublisher.once("accessAllowed", () => {
                this.state.session.unpublish(this.state.mainStreamManager);

                this.state.session.publish(sharePublisher);
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

    openFilterModal(){
        this.setState({
            filterOpen: true,
        });
    }
    applyFilter(uri){

        if(uri === undefined || this.state.filterURI !== uri){
            this.removeFilter();
        }
        this.setState({
            facefilterEnable: true,
            filterOpen: false,
            filterURI:uri,
        });
        if(uri !== undefined){
            var filter = { type: '', options: {} };
            filter.type = 'FaceOverlayFilter';
            //filter. options = {"command": "audioecho delay=40000000 intensity=0.7 feedback=0.4"};
            filter. options = {};
            this.state.publisher.stream.applyFilter(filter.type, filter.options)
                .then(f => {
                    if(f.type === 'FaceOverlayFilter'){
                        f.execMethod(
                            "setOverlayedImage",
                            {
                                //"uri": "https://cdn.pixabay.com/photo/2017/09/30/09/29/cowboy-hat-2801582_960_720.png",
                                "uri": uri,
                                "offsetXPercent": "-0.1F",
                                "offsetYPercent": "-0.8F",
                                "widthPercent": "1.5F",
                                "heightPercent": "1.0F"
                            });
                    }})
                .catch(error => console.error(error));
        }
    }
    removeFilter() {
    	this.state.publisher.stream.removeFilter();
        this.setState({
            facefilterEnable: false,
        });
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
                            <button
                                id="buttonSwitchCamera"
                                onClick={this.switchCamera}>
                                <span class="button-text">카메라 변경</span>
                                <SyncOutlined />
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
                                <span class="button-text">{this.state.shareEnable ? "화면공유 해제" : "화면공유"}</span>
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
                                id="buttonFilter"
                                onClick={this.openFilterModal}>
                                <span class="button-text">{this.state.facefilterEnable ?  "비디오필터 제거" : "비디오필터 적용"}</span>
                                <SettingFilled />
                            </button>
                            <button
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}>
                                <span class="button-text">나가기</span>
                                <ExportOutlined />
                            </button>

                        </div>
                        <VideoFilter open={this.state.filterOpen} header="설정" parentsFunc={this.applyFilter}/>

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
    getToken(role) {
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
                            'OpenVidu 서버에 연결할 수 없습니다. 이는 ' +
                            OPENVIDU_SERVER_URL +
                            '에서 인증 오류일 수 있습니다.',
                        );
                        if (
                            window.confirm(
                                'OpenVidu 서버에 연결할 수 없습니다. ' +
                                OPENVIDU_SERVER_URL +
                                '에서 인증 오류가 발생할 수 있습니다.\n\n"확인"을 클릭하여 인증서를 수락하고 이동합니다. ' +
                                '인증 경고가 표시되지 않으면 OpenVidu 서버가 ' +
                                OPENVIDU_SERVER_URL +
                                '에서 정상적으로 실행되는지 확인해 주세요.',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {

        var jsonBody = {
            role: 'PUBLISHER',
            kurentoOptions: {}
        };
        jsonBody.kurentoOptions = {
			allowedFilters: ["GStreamerFilter", 'FaceOverlayFilter']
		}
        return new Promise((resolve, reject) => {
            var data = JSON.stringify(jsonBody);
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
