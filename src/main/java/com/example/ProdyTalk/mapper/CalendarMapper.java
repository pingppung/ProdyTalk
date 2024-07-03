package com.example.prodytalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.CalendarVO;
import com.example.prodytalk.vo.MyCalendarVO;

import java.util.Calendar;
import java.util.List;

@Repository
@Mapper
public interface CalendarMapper {
    List<Calendar> getCalendar(int room_id);

    void addEvent(CalendarVO CalendarVO);

    int searchLast();

    void editEvent(CalendarVO calendarVO);

    void deleteEvent(CalendarVO calendarVO);

    List<Calendar> getMyCalendar(String user_id);

    int searchMyLast();

    void addMyEvent(MyCalendarVO myCalendarVO);

    void editMyEvent(MyCalendarVO myCalendarVO);

    void deleteMyEvent(MyCalendarVO myCalendarVO);
}