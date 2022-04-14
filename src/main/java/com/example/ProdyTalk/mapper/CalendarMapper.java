package com.example.ProdyTalk.mapper;

import com.example.ProdyTalk.vo.CalendarVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

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
}