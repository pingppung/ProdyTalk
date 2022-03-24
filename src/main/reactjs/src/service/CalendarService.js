import axios from 'axios';
const CALENDAR_API_BASE_URL = "http://localhost:8080/calendar";
const CALENDARADD_API_BASE_URL = "http://localhost:8080/calendar/add";

class CalendarService {
    static event = {};

    getCalendar() {
        return axios.get(CALENDAR_API_BASE_URL);
    }

    addEvent(event) {
        axios.get(CALENDARADD_API_BASE_URL);
    }
}

export default new CalendarService();