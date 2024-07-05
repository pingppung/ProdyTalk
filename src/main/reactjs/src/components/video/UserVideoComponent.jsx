import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import { AudioMutedOutlined} from '@ant-design/icons';
import '../css/Video.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }
    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div className="video-username"><p>{this.getNicknameTag()}</p></div>
                        <div className="video-audiostate">{this.props.streamManager.stream.audioActive ? null : <AudioMutedOutlined />}</div>
                    </div>
                ) : null}
            </div>
        );
    }
}