import React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarService from '../service/CalendarService';

import Modal from './Modal'
import EditModal from './EditModal'

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

    // Modal에서 add 버튼 클릭 시 실행
    const addModal = (content, startDate, endDate, color) => {
        CalendarService.addEvent(content, startDate, endDate, color); // events에 전달받은 이벤트 추가해주기
        setModalOpen(false); // Modal 닫아주기

    };

    useEffect(()=> {
        CalendarService.getCalendar().then((res) => {
            setEvents(res.data)

        })
    }, [events]);

  return (
    <div className="Calendar">

      <Modal open={modalOpen} close={closeModal} propFunction={addModal} header="일정을 입력해주세요.">
      </Modal>

      <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth" // 기본 : 월 달력
            headerToolbar={{ // 월, 주, 일 버튼 클릭 시 달력 보기 변경
                center: 'dayGridMonth,timeGridWeek,timeGridDay new',
            }}

            displayEventTime={false}

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

        eventClick={(e) =>
            prompt('이벤트의 제목을 수정하세요! (이벤트를 삭제하고 싶은 경우 "delete"라고 입력하세요!)')
        }
      />
    </div>
  ); // return 끝
}

export default Calender