import React, { useState, Component } from 'react';
import { Link } from "react-router-dom";
class RoomEnter extends Component {
    //데베에서 불러와서 text에 넣어야돼..!
    constructor(props) {
        super(props);
        this.state = {
            num: "num",
            nicknames: "nicknames",
            memo: "memo"
        };
    }

    render(){
        return (
            <div>
                <button>프로젝트 정보</button>
                <button>팀별 캘린더</button>
                <button>파일공유</button>
                <button>그룹채팅</button>
                <Link to="/video"><button>화상채팅</button></Link>
                    <div className="ProjectInformation">
                        <h1>팀별 인원수</h1>
                        <h1>{this.state.num}</h1>
                    </div>
                    <div>
                         <h1>팀원 닉네임</h1>
                         <h1>{this.state.nicknames}</h1>
                    </div>
                    <div>
                         <h1>프로젝트 요약</h1>
                         <h1>{this.state.memo}</h1>
                    </div>
            </div>
        );
    }
}

export default RoomEnter;