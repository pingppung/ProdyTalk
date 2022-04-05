import axios from 'axios';

class CalendarService {

    getCalendar() {
        return axios.get("/calendar");
    }

    addEvent(content,startDate,endDate,color) {
        axios.post("/calendar/add", {
            title: content,
            start: startDate,
            end: endDate,
            color: color
        })
        console.log(color);

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