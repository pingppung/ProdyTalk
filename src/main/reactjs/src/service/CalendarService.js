import axios from 'axios';
const CALENDAR_API_BASE_URL = "http://localhost:8080/calendar";
const CALENDARADD_API_BASE_URL = "http://localhost:8080/calendar/add";

class CalendarService {

    getCalendar() {
        return axios.get(CALENDAR_API_BASE_URL);
    }

    addEvent(content,startDate,endDate) {
        axios.post(CALENDARADD_API_BASE_URL, {
            title: content,
            start: startDate,
            end: endDate
        })
        console.log(content, startDate, endDate);
    }
}

export default new CalendarService();