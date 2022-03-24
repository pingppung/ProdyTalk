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
    public List<Calendar> getCalendar() throws Exception {
        return calendarMapper.getCalendar();
    }

    @Override
    public void addEvent(CalendarVO calendarVO) {
        calendarMapper.addEvent(calendarVO);
    }
}