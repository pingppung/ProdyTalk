package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.CalendarMapper;
import com.example.ProdyTalk.service.CalendarService;
import com.example.ProdyTalk.vo.RoomVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;
import java.util.List;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    @Autowired
    CalendarMapper calendarMapper;

    @GetMapping("/calender")
    public List<Calendar> getCalendar() throws Exception{
        System.out.println("Calendar 불러오기 성공");

        return calendarService.getCalendar();
    }
}
