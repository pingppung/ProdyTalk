import axios from 'axios';
const CALENDAR_API_BASE_URL = "http://localhost:8080/calendar";
const CALENDARADD_API_BASE_URL = "http://localhost:8080/calendar/add";

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

    }
}

export default new CalendarService();