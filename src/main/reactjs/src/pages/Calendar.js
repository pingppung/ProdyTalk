import React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarService from '../service/CalendarService';

import Modal from './Modal'
import DetailModal from './DetailModal'

function Calender() {

    const [events, setEvents] = useState([]);

    // open인 경우만 Modal 열림
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true); // modal open
    };
    const closeModal = () => {
        setModalOpen(false); // modal close
    };

    // DetailModal용
    // open인 경우만 Modal 열림
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const openDetailModal = () => {
        // console.log("detail modal 오픈!");
        setDetailModalOpen(true); // detail modal open
    };

    const closeDetailModal = () => {
        setDetailModalOpen(false); // detail modal close
    };

    // Modal에서 add 버튼 클릭 시 실행
    const addModal = (content, startDate, endDate) => {
        CalendarService.addEvent(content, startDate, endDate); // events에 전달받은 이벤트 추가해주기
        setModalOpen(false); // Modal 닫아주기
    };

    useEffect(()=> {
        CalendarService.getCalendar().then((res) => {
            setEvents(res.data)
        })
    }, [addModal]);

  return (
    <div className="Calendar">

      <Modal open={modalOpen} close={closeModal} propFunction={addModal} header="일정을 입력해주세요.">
      </Modal>

      <DetailModal open={detailModalOpen} close={closeDetailModal} header="Event 수정/삭제">
      </DetailModal>

      <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth" // 기본 : 월 달력
            headerToolbar={{ // 월, 주, 일 버튼 클릭 시 달력 보기 변경
                center: 'dayGridMonth,timeGridWeek,timeGridDay new',
            }}

        customButtons = {{
            new : {
                text : "new",

                click : function() {
                    openModal();
                }

            }
        }}
        events={events} // event 전달
        eventColor="gray"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        // eventClick={(e) => console.log(e.event.id)}

        // 이벤트 클릭 시 DetailModal open
        eventClick={(e) =>
            openDetailModal()
        }

        /*
        eventClick={(e) => {
            const val = prompt('이벤트의 제목을 수정하세요! 이벤트를 삭제하고 싶은 경우 "delete"를 입력하세요');
            console.log(e.event.title); // 선택한 이벤트의 title

            if(val) {
                if('delete' === val) {
                    console.log('삭제 선택');
                }

                else { // title 수정
                    const temp = events.find(e => e.title === events.event.title); // 선택한 이벤트 찾기
                    temp.title = val; // 해당 이벤트 입력한 제목으로 수정

                    console.log(val);
                    console.log('로 제목 수정');
                    console.log(temp.title);
                }
            }
          }
        }
        */

      />
    </div>
  ); // return 끝
}

export default Calender