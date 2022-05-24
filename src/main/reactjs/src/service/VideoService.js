import axios from 'axios';

class VideoService {
    videoSetting(userName, SessionId, videoDeviceId, audioDeviceId) {
        axios.post("/api/video/setting", {
            username: userName,
            sessionId: SessionId,
        })
    }

    changeAudioState(){

    }
}

export default new VideoService();
