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

    @Autowired
    CalendarMapper calendarMapper;

    @GetMapping("/calendar")
    public List<Calendar> getCalendar() throws Exception{
        return calendarService.getCalendar();
    }

    @PostMapping("/calendar/add")
    public void addEvent(@RequestBody CalendarVO calendarVO) throws Exception{
        calendarService.addEvent(calendarVO);
    }
}
