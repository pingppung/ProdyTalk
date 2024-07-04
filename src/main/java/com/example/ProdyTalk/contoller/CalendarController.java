package com.example.prodytalk.contoller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.prodytalk.mapper.CalendarMapper;
import com.example.prodytalk.service.CalendarService;
import com.example.prodytalk.vo.CalendarVO;
import com.example.prodytalk.vo.MyCalendarVO;

import java.util.Calendar;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;
    private int calendar_id;

    @Autowired
    CalendarMapper calendarMapper;

    @GetMapping("/calendar")
    public List<Calendar> getCalendar(@RequestParam(value = "room_id") int room_id) throws Exception {
        return calendarService.findGroupCalendar(room_id);
    }

    @PostMapping("/calendar/add")
    public void addEvent(@RequestBody CalendarVO calendarVO) throws Exception {
        calendar_id = calendarService.findLastGroupCalendarId();
        calendarVO.setCalendar_id(++calendar_id);
        calendarService.addGroupEvent(calendarVO); // 캘린더 추가
    }

    @PostMapping("/calendar/edit")
    public void editEvent(@RequestBody CalendarVO calendarVO) throws Exception {
        calendarService.updateGroupEvent(calendarVO);
    }

    @PostMapping("/calendar/delete")
    public void deleteEvent(@RequestBody CalendarVO calendarVO) throws Exception {
        calendarService.deleteGroupEvent(calendarVO);
    }

    // 개인 캘린더
    @GetMapping("/myCalendar")
    public List<Calendar> getMyCalendar(@RequestParam(value = "user_id") String user_id) throws Exception {
        return calendarService.findMyCalendar(user_id);
    }

    @PostMapping("/myCalendar/add")
    public void addMyEvent(@RequestBody MyCalendarVO myCalendarVO) throws Exception {
        calendar_id = calendarService.findLastMyCalendarId();
        myCalendarVO.setCalendar_id(++calendar_id);
        calendarService.addMyEvent(myCalendarVO); // 캘린더 추가
    }

    @PostMapping("/myCalendar/edit")
    public void editEvent(@RequestBody MyCalendarVO myCalendarVO) throws Exception {
        calendarService.updateMyEvent(myCalendarVO);
    }

    @PostMapping("/myCalendar/delete")
    public void deleteEvent(@RequestBody MyCalendarVO myCalendarVO) throws Exception {
        calendarService.deleteMyEvent(myCalendarVO);
    }

}
