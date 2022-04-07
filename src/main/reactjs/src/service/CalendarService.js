import axios from 'axios';

class CalendarService {

    getCalendar(roomId) {
        return axios.get("/calendar",{params: { room_id: roomId,}});
    }

    addEvent(content,startDate,endDate,color,roomId) {
        axios.post("/calendar/add", {
            title: content,
            start: startDate,
            end: endDate,
            color: color,
            room_id: roomId,
        })
    }

    editEvent(calId, editTitle) {
        axios.post("/calendar/edit", {
            calendar_id : calId,
            title : editTitle
        })
    }

    deleteEvent(calId) {
        axios.post("/calendar/delete", {
            calendar_id : calId
        })
    }
}

export default new CalendarService();