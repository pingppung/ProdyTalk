package com.example.prodytalk.service;

import java.util.Calendar;
import java.util.List;

import com.example.prodytalk.vo.CalendarVO;
import com.example.prodytalk.vo.MyCalendarVO;

public interface CalendarService {
    public List<Calendar> getCalendar(int room_id) throws Exception;

    public void addEvent(CalendarVO calendarVO);

    public int searchLast();

    public void editEvent(CalendarVO calendarVO);

    public void deleteEvent(CalendarVO calendarVO);

    public List<Calendar> getMyCalendar(String user_id) throws Exception;

    public int searchMyLast();

    public void addMyEvent(MyCalendarVO myCalendarVO);

    public void editMyEvent(MyCalendarVO myCalendarVO);

    public void deleteMyEvent(MyCalendarVO myCalendarVO);
}
