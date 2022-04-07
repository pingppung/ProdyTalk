package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.CalendarMapper;
import com.example.ProdyTalk.service.CalendarService;
import com.example.ProdyTalk.vo.CalendarVO;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;
    private int calendar_id;

    @Autowired
    CalendarMapper calendarMapper;


    @GetMapping("/calendar")
    public List<Calendar> getCalendar(@RequestParam(value="room_id") int room_id) throws Exception{
        return calendarService.getCalendar(room_id);
    }

    @PostMapping("/calendar/add")
    public void addEvent(@RequestBody CalendarVO calendarVO) throws Exception{
        calendar_id=calendarService.searchLast();
        calendarVO.setCalendar_id(++calendar_id);
        calendarService.addEvent(calendarVO); //캘린더 추가
    }

    @PostMapping("/calendar/edit")
    public void editEvent(@RequestBody CalendarVO calendarVO) throws Exception{
        calendarService.editEvent(calendarVO);
    }

    @PostMapping("/calendar/delete")
    public void deleteEvent(@RequestBody CalendarVO calendarVO) throws Exception{
        calendarService.deleteEvent(calendarVO);
    }

}
