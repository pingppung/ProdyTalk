import React,{useEffect} from 'react';
import {useState} from 'react';
import './css/Modal.css';

const DetailModal = (props) => {

    const { open, close, add, header } = props;

    const[changeNum, setChangeNum] = useState(1);
    const[editTitle, setEditTitle] = useState(''); // 바꿀 제목

    const changeTitle = (e) => {
        setEditTitle(e.target.value);
    }

    // 수정 버튼 클릭 시 실행
    const editEvent = (e) => {
        console.log('수정 버튼 클릭함');

        setChangeNum(changeNum+1); // title 바꿀 때 마다 (수정 버튼 클릭할 때 마다) title 비워주기 위해
        props.propFunction(editTitle); // editTitle 전달 (바뀐 title전달)
    }

    // 삭제 버튼 클릭 시 실행
    const deleteEvent = (e) => {
        console.log('Event 삭제');

        props.propFunction2(deleteEvent);
    }

    useEffect(()=> {
        setEditTitle('');
    }, [changeNum])

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
                  {open ? (
                    <section>
                      <header>
                        {header}
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                      </header>

                    <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="taskId" className="col-form-label">이벤트 제목 수정</label>
                            <input type="text" onChange={changeTitle} className="form-control" value={editTitle} id="calendar_edit_title" name="calendar_edit_title"/>
                        </div>
                    </div>

                    <footer>
                        <button className="edit" onClick={editEvent}>
                          수정
                        </button>
                        <button className="delete" onClick={deleteEvent}>
                          삭제
                        </button>
                    </footer>

                    </section>
                  ) : null}
                </div>
    );
};

export default DetailModal;