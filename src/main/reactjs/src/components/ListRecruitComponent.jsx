import React, { Component } from 'react';
import RecruitService from '../service/RecruitService';
import './css/Recruit.css';

class ListRecruitComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recruits: [] // 페이지에 표시될 글 목록 데이터
        }

        // 작성 버튼 클릭 시 createRecruit 동작
        this.createRecruit = this.createRecruit.bind(this);
    }

    // RecruitService의 메소드 호출해서 데이터 가져옴
    componentDidMount() {
        RecruitService.getRecruits().then((res) => {
            this.setState({ recruits: res.data });
        });
    }

    // 작성 버튼 클릭 시 글 작성 페이지로 이동
    createRecruit() {
        this.props.history.push('/createRecruit/_create')
    }

    // 제목 클릭 시 상세보기 페이지로 이동
    readRecruit(recruit_id) {
        this.props.history.push(`/readRecruit/${recruit_id}`);
    }

     render() {
            return (
                <div>
                    <h2 className="text-center">Recruits List</h2>
                    <div className = "row">
                        <button className="btn btn-primary" onClick={this.createRecruit}>게시글 작성</button>
                    </div>
                    <div className ="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>글 번호</th>
                                    <th>제목 </th>
                                    <th>작성자 </th>
                                    <th>작성일 </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.recruits.map(
                                        recruit =>
                                        <tr key = {recruit.recruit_id}>
                                            <td> {recruit.recruit_id} </td>
                                            <td> <a onClick = { () => this.readRecruit(recruit.recruit_id)}> {recruit.title} </a></td>
                                            <td> {recruit.user_id} </td>
                                            <td> {recruit.date} </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }

export default ListRecruitComponent;