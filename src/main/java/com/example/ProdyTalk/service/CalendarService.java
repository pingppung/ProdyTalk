package com.example.prodytalk.service;

import java.util.Calendar;
import java.util.List;

import com.example.prodytalk.vo.CalendarVO;
import com.example.prodytalk.vo.MyCalendarVO;

public interface CalendarService {
    // 그룹 캘린더용
    // 특정 룸 ID의 그룹 캘린더 이벤트 목록 조회
    public List<Calendar> findGroupCalendar(int room_id) throws Exception;

    // 그룹 캘린더 이벤트 추가
    public void addGroupEvent(CalendarVO calendarVO);

    // 가장 최근의 그룹 캘린더 ID 조회
    public int findLastGroupCalendarId();

    // 그룹 캘린더 이벤트 업데이트
    public void updateGroupEvent(CalendarVO calendarVO);

    // 그룹 캘린더 이벤트 삭제
    public void deleteGroupEvent(CalendarVO calendarVO);

    // 개인 캘린더용
    // 특정 사용자 ID의 개인 캘린더 이벤트 목록 조회
    public List<Calendar> findMyCalendar(String user_id) throws Exception;

    // 가장 최근의 개인 캘린더 ID 조회
    public int findLastMyCalendarId();

    // 개인 캘린더 이벤트 추가
    public void addMyEvent(MyCalendarVO myCalendarVO);

    // 개인 캘린더 이벤트 업데이트
    public void updateMyEvent(MyCalendarVO myCalendarVO);

    // 개인 캘린더 이벤트 삭제
    public void deleteMyEvent(MyCalendarVO myCalendarVO);
}
