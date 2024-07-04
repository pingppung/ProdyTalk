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
    List<Calendar> selectGroupCalendar(int room_id);

    void insertGroupEvent(CalendarVO CalendarVO);

    int selectLastGroupCalendarId();

    void updateGroupEvent(CalendarVO calendarVO);

    void deleteGroupEvent(CalendarVO calendarVO);

    List<Calendar> selectMyCalendar(String user_id);

    int selectLastMyCalendarId();

    void insertMyEvent(MyCalendarVO myCalendarVO);

    void updateMyEvent(MyCalendarVO myCalendarVO);

    void deleteMyEvent(MyCalendarVO myCalendarVO);
}