package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.CalendarVO;

import java.util.Calendar;
import java.util.List;

public interface CalendarService {
    public List<Calendar> getCalendar(int room_id) throws Exception;
    public void addEvent(CalendarVO calendarVO);
    public int searchLast();
    public void editEvent(CalendarVO calendarVO);
    public void deleteEvent(CalendarVO calendarVO);
}
