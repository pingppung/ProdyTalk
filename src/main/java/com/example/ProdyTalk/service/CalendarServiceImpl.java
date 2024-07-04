package com.example.prodytalk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.prodytalk.mapper.CalendarMapper;
import com.example.prodytalk.vo.CalendarVO;
import com.example.prodytalk.vo.MyCalendarVO;

import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final CalendarMapper calendarMapper;

    @Override
    public List<Calendar> findGroupCalendar(int room_id) throws Exception {
        return calendarMapper.selectGroupCalendar(room_id);
    }

    @Override
    public void addGroupEvent(CalendarVO calendarVO) {
        calendarMapper.insertGroupEvent(calendarVO);
    }

    @Override
    public int findLastGroupCalendarId() {
        return calendarMapper.selectLastGroupCalendarId();
    }

    @Override
    public void updateGroupEvent(CalendarVO calendarVO) {
        calendarMapper.updateGroupEvent(calendarVO);
    }

    @Override
    public void deleteGroupEvent(CalendarVO calendarVO) {
        calendarMapper.deleteGroupEvent(calendarVO);
    }

    @Override
    public List<Calendar> findMyCalendar(String user_id) throws Exception {
        return calendarMapper.selectMyCalendar(user_id);
    }

    @Override
    public void addMyEvent(MyCalendarVO myCalendarVO) {
        calendarMapper.insertMyEvent(myCalendarVO);
    }

    @Override
    public int findLastMyCalendarId() {
        return calendarMapper.selectLastMyCalendarId();
    }

    @Override
    public void updateMyEvent(MyCalendarVO myCalendarVO) {
        calendarMapper.updateMyEvent(myCalendarVO);
    }

    @Override
    public void deleteMyEvent(MyCalendarVO myCalendarVO) {
        calendarMapper.deleteMyEvent(myCalendarVO);
    }
}