package com.example.ProdyTalk.service;

import com.example.ProdyTalk.mapper.CalendarMapper;
import com.example.ProdyTalk.vo.CalendarVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final CalendarMapper calendarMapper;

    @Override
    public List<Calendar> getCalendar(int room_id) throws Exception {
        return calendarMapper.getCalendar(room_id);
    }

    @Override
    public void addEvent(CalendarVO calendarVO) { calendarMapper.addEvent(calendarVO);}

    @Override
    public int searchLast() {
        return calendarMapper.searchLast();
    }

    @Override
    public void editEvent(CalendarVO calendarVO) {
        calendarMapper.editEvent(calendarVO);
    }

    @Override
    public void deleteEvent(CalendarVO calendarVO) {
        calendarMapper.deleteEvent(calendarVO);
    }
}