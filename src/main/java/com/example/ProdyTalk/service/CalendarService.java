package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.CalendarVO;

import java.util.Calendar;
import java.util.List;

public interface CalendarService {
    public List<Calendar> getCalendar() throws Exception;
    public void addEvent(CalendarVO calendarVO);
}
