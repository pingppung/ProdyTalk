import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// 모달
import Modal from 'react-modal';

const events = [
  {
    id: 1,
    title: 'event 1',
    start: '2021-06-14T10:00:00',
    end: '2021-06-14T12:00:00',
  },
  {
    id: 2,
    title: 'event 2',
    start: '2021-06-16T13:00:00',
    end: '2021-06-16T18:00:00',
  },
  { id: 3, title: '캡스톤 모임', start: '2022-03-17', end: '2022-03-17' },
];

function Calender() {

  return (

    <div className="Calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // 기본 : 월 달력
        headerToolbar={{ // 월, 주, 일 버튼 클릭 시 달력 보기 변경
          center: 'dayGridMonth,timeGridWeek,timeGridDay new',
        }}

        customButtons={{
          new: { // 일정 추가 버튼
            text: 'new', // 버튼 내용
            // 버튼 클릭 시 Modal 뜨도록 (일정 추가 Modal)

            click : function() { // 일정 추가 버튼 클릭 이벤트

            }
          },
        }}
        events={events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
        //locale='ko'
      />
    </div>
  );
}

export default Calender