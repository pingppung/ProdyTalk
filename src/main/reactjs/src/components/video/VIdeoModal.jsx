import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../css/Modal.css';
import UserVideoComponent from './UserVideoComponent';
import { OpenVidu } from 'openvidu-browser';
import OpenViduVideoComponent from './OvVideo';
import UserService from '../../service/UserService'
import VideoService from '../../service/VideoService'

const VideoModal = (props) => {

    const { open, close, header } = props;
    const location=useLocation();
    const roomid=location.state;
    let history = useHistory();

    const [videoDevices, setVideoDevices] = useState([]);
    const [audioDevices, setAudioDevices] = useState([]);

    const [SessionId, setSessionId] = useState('');   //방이름
    const [userName, setUserName] = useState(''); //유저이름
    const [mainVideo,setMainVideo] = useState();

    const [videoDeviceId, setVideoDeviceId] = useState('');
    const [audioDeviceId, setAudioDeviceId] = useState('');
    const [localStream, setLocalStream] = useState<MediaStream>();

    useEffect(async () => {

        UserService.getUserName().then(res => {
            setUserName(res.data.id);
        });
        setSessionId(roomid);
        await getDevices(); //카메라 목록 찾아서 화면 띄우기

     }, []);

    async function getMedia(deviceId) {
      const initialConstrains = {
          audio: true,
          video: true,
      };
      try {
         var myStream = await navigator.mediaDevices.getUserMedia(initialConstrains);
         await setMainVideo(myStream);
         console.log(mainVideo);
      } catch (e) {
        console.log(e);
      }
    }


    async function getDevices() {
       try {
         const devices = await navigator.mediaDevices.enumerateDevices();
         await setVideoDevices(devices.filter((device) => device.kind === "videoinput"));
         await setAudioDevices(devices.filter((device) => device.kind === "audioinput"));
         await getMedia();
       } catch (e) {
         console.log(e);
       }
    }
    const handleChangeSessionId= (e) => {
        setSessionId(e.target.value);
    }

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    }

    const handleVideoSelect = (e) => {
        console.log(e.target.value)
        setVideoDeviceId(e.target.value);
    };
    const handleAudioSelect = (e) => {
        setAudioDeviceId(e.target.value);
    };

    const join = () => {
        //VideoService.videoSetting(userName, SessionId, videoDeviceId, audioDeviceId);
        history.push(`/video/${roomid}`);
    }

    return(
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
            <section>
                <header>
                    {header}
                </header>
                <div className="modal-body">
                    선택한 카메라 띄워보기
                    <br />
                    카메라 선택 :
                     <select onChange={handleVideoSelect}>
                        {videoDevices.map((videoDevice, index) => (
                            <option key={videoDevice.deviceId} value={videoDevice.label}>
                                {videoDevice.label}
                            </option>
                        ))}
                     </select>
                     <br />
                    마이크 선택 :
                    <select onChange={handleAudioSelect}>
                        {audioDevices.map((audioDevice, index) => (
                            <option key={audioDevice.deviceId} value={audioDevice.deviceId}>
                                {audioDevice.label}
                            </option>
                        ))}
                    </select>
                    <p>
                        <label>닉네임: </label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={handleChangeUserName}
                            required
                        />
                    </p>
                    <p>
                        <label> Session: </label>
                        <input
                            type="text"
                            id="sessionId"
                            value={SessionId}
                            onChange={handleChangeSessionId}
                            required
                        />
                    </p>
                </div>
                <footer>
                    <button className="btn btn-lg btn-success" name="commit" onClick={join}>
                      입장
                    </button>
                    <button className="close" onClick={close}>
                      닫기
                    </button>
                </footer>
            </section>
            ) : null}
        </div>

    );
};
export default VideoModal;