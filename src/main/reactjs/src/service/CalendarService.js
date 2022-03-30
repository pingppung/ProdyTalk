import axios from 'axios';
const CALENDAR_API_BASE_URL = "http://localhost:8080/calendar";
const CALENDARADD_API_BASE_URL = "http://localhost:8080/calendar/add";

const CALENDAREDIT_API_BASE_URL = "http://localhost:8080/calendar/edit";
const CALENDARREMOVE_API_BASE_URL = "http://localhost:8080/calendar/delete";

class CalendarService {

    getCalendar() {
        return axios.get(CALENDAR_API_BASE_URL);
    }

    addEvent(content,startDate,endDate,color) {
        axios.post(CALENDARADD_API_BASE_URL, {
            title: content,
            start: startDate,
            end: endDate,
            color: color
        })
        console.log(color);

    }

    editEvent(calId, editTitle) {
        axios.post(CALENDAREDIT_API_BASE_URL, {
            calendar_id : calId,
            title : editTitle
        })
    }

    deleteEvent(calId) {
        axios.post(CALENDARREMOVE_API_BASE_URL, {
            calendar_id : calId
        })
    }
}

export default new CalendarService();