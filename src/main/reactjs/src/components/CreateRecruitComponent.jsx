import React, { Component } from 'react';
import RecruitService from '../service/RecruitService';
import UserService from '../service/UserService'
import './css/Recruit.css';

class CreateRecruitComponent extends Component {
    constructor(props) {
        super(props)

        // 글 작성 form 양식에서 사용될 파라미터 정의
        this.state = {
            recruit_id: this.props.match.params.recruit_id, // 새 글 작성인지 수정인지 구분 위한 파라미터
            room_type: '스터디',
            title: '',
            content: '',
            user_id: '',
            date: this.getDate(),
        }

        // form 양식에 값 입력되면 this.state에 정의된 변수의 값 변경됨
        // save 버튼 클릭 시 api에 글 작성 request 보내는 함수 bind
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.createRecruit = this.createRecruit.bind(this);
    }

    // this.setState로 this.state에 정의된 변수에 값 대입하게 해줌
    changeTypeHandler = (event) => {
        this.setState({room_type: event.target.value});
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeContentsHandler = (event) => {
        this.setState({content: event.target.value});
    }

    changeUserIdHandler = (event) => {
        this.setState({user_id: event.target.value});
    }

    // save 버튼 클릭 시 api에 글 작성 request 보내는 함수 선언
    createRecruit = (event) => {
        event.preventDefault();
        let recruit = {
            room_type: this.state.room_type,
            title: this.state.title,
            content: this.state.content,
            user_id: this.state.user_id,
            date: this.state.date
        };
        console.log("recruit => "+ JSON.stringify(recruit));

        if(this.state.recruit_id === '_create') { // 새 글 작성
             RecruitService.createRecruit(recruit).then(res => { // 글 목록 페이지로 이동
                 this.props.history.push('/recruit');
             });
        }

        else { // 글 수정
            RecruitService.updateRecruit(this.state.recruit_id, this.state.title, this.state.content, this.state.user_id) .then(() => {
                this.props.history.push('/recruit')
            })
        }
    }

    // 글 작성 취소 버튼 클릭 시 글 목록 페이지로 이동
    cancel() {
        this.props.history.push('/recruit');
    }

    getTitle() {
        if (this.state.recruit_id === '_create') {
            return <h3 className="text-center">새 글을 작성해주세요</h3>
        }
        else {
            return <h3 className="text-center">{this.state.recruit_id}글을 수정 합니다</h3>
        }
    }

    // 작성일
    getDate() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();

        let todayDate = year + '-' + month + '-' + day;
        return todayDate;
    }

    // 페이지 로딩 시 새글 작성이면 비어있는 폼, 수정이면 글의 객체값 가져와서 binding 해주도록
    componentDidMount() {

        // UserService에서 user_id 가져오기
        UserService.getUserName().then(res => {
            console.log(res.data.id);
            this.setState({
                user_id: res.data.id,
            })
        })

        if(this.state.recruit_id === '_create') {
            return
        }
        else {
            RecruitService.getOneRecruit(this.state.recruit_id).then((res) => {
                let recruit = res.data;
                console.log("recruit => " + JSON.stringify(recruit));

                this.setState({
                    room_type: recruit.room_type,
                    title: recruit.title,
                    content: recruit.content,
                    user_id: recruit.user_id
                });
            });
        }
    }

     render() {
            return (
                        <div>
                            <div className = "container">
                                <div className = "row">
                                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                                        <h3 className="text-center">새글을 작성해주세요</h3>
                                        <div className = "card-body">
                                            <form id="createRecruitForm">
                                                <div className = "form-group">
                                                    <label> Type </label>
                                                    <select placeholder="type" name="type" className="form-control"
                                                    value={this.state.room_type} onChange={this.changeTypeHandler}>
                                                        <option value="스터디">스터디</option>
                                                        <option value="프로젝트">프로젝트</option>
                                                    </select>
                                                </div>
                                                <div className = "form-group">
                                                    <label> Title </label>
                                                    <input type="text" placeholder="title" name="title" className="form-control"
                                                    value={this.state.title} onChange={this.changeTitleHandler}/>
                                                </div>
                                                <div className = "form-group">
                                                    <label> Content  </label>
                                                    <textarea placeholder="content" name="content" className="form-control"
                                                    value={this.state.content} onChange={this.changeContentsHandler}/>
                                                </div>
                                                <div className = "form-group">
                                                    <label> UserId  </label>
                                                    <input placeholder="userId" name="userId" className="form-control"
                                                    value={this.state.user_id} onChange={this.changeUserIdHandler} disabled/>
                                                </div>
                                                <button className="btn btn-success" onClick={this.createRecruit}>Save</button>
                                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            );
        }
    }

export default CreateRecruitComponent;