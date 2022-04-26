import React, { Component } from 'react';
import RecruitService from '../service/RecruitService'
import './css/Recruit.css';

import UserService from '../service/UserService'

class ReadRecruitComponent extends Component {
    constructor(props) {
        super(props)

        // 상세보기에 사용될 파라미터 정의
        this.state = {
            recruit_id : this.props.match.params.recruit_id,
            recruit: {},
            chatCondition : false,
            roleCondition: false,
        }
    }

        // 페이지 로딩될 때 api와 통신해 글 객체 가져옴
        componentDidMount() {
            RecruitService.getOneRecruit(this.state.recruit_id).then((res) => {
                this.setState({ recruit: res.data });
                this.getRoleCondition(this.state.recruit.user_id);
            });

            // UserService에서 user_id 가져오기
            UserService.getUserName().then(res => {
                this.setState({
                    user_id: res.data.id,
                })

                this.getRoleCondition(this.state.user_id); // 로그인 한 user_id 검사 위해
            })
        }

        // 수정, 삭제 권한 있는 지 검사
        getRoleCondition(write_id, login_id) {
            if(this.state.recruit.user_id == this.state.user_id) {
                this.setState({
                    roleCondition: true,
                })
            }
            else {
                this.setState({
                    roleCondition: false,
                })
            }

            console.log(this.state.roleCondition);
        }

        // 파라미터 값에 따라 페이지에 표시할 내용 변경
        // 게시글 타입별(스터디/프로젝트)로 표시 다르게 함
        returnRecruitType(typeNo) {
            let type = null;
            if(typeNo == '스터디') {
                type = "스터디 게시판";
            }
            else if(typeNo == '프로젝트') {
                type = "프로젝트 게시판"
            }
            else {
                type = "타입 미지정"; // 수정하기 (자유게시판 등)
            }

            return (
                <div className="readRow">
                    <label> Recruit Type : {type} </label>
                </div>
            )
        }

        /*
        returnDate(cTime, uTime) {
            return (
                <div className = "row">
                    <label>생성일 : [ {cTime} / 최종 수정일 : [ {uTime} ]</label>
                </div>
            )
        }
        */

        // 글 목록으로 이동하는 함수 정의
        goToList() {
            this.props.history.push("/recruit");
        }

        // 글 수정으로 이동
        goToUpdate = (event) => {
            if(this.state.roleCondition) {
                event.preventDefault();
                this.props.history.push(`/createRecruit/${this.state.recruit_id}`);
            }
            else {
                alert("※ 본인만 글을 수정할 수 있습니다");
            }
        }

        deleteView = async function () {
            if(this.state.roleCondition) {
                if(window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
                    RecruitService.deleteRecruit(this.state.recruit_id).then( res => {
                        console.log("delete result => " + JSON.stringify(res));

                        if(res.status == 200) {
                            this.props.history.push('/recruit');
                        }
                        else {
                            alert("글 삭제를 실패했습니다.");
                        }
                    });
                }
            }

            else {
                alert("※ 본인만 글을 삭제할 수 있습니다");
            }
        }

    render() {
        return (
            <div>
            글 작성자는 {this.state.recruit.user_id}
                <div className = "card col-md-6 offset-md-3">
                    <h3 className ="text-center"> Read Detail
                        <button className="btn btn-info"
                            onClick={ () => this.setState({ chatCondition : true })}
                            style={{marginLeft:"10px"}}> 채팅 </button>
                    </h3>
                    <div className = "card-body">
                            {this.returnRecruitType(this.state.recruit.room_type)}
                            <div className = "readRow">
                                <label> Title : {this.state.recruit.title} </label>
                            </div>

                            <div className = "readRow">
                                <label> Content : </label> <br></br>
                                <textarea value={this.state.recruit.content} readOnly/>
                            </div >

                            <div className = "readRow">
                                <label> UserId : {this.state.recruit.user_id} </label>
                            </div>

                            <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                            <button className="btn btn-info" onClick={this.goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                            <button className="btn btn-danger" onClick={() => this.deleteView()} style={{marginLeft:"10px"}}>글 삭제</button>
                    </div>
                </div>
                <div>
                {/* <div className="chatComponent">
                    { this.state.chatCondition ? <ChatPage/> : null }
                </div> */}
                </div>
            </div>
        );
    }
}

export default ReadRecruitComponent;