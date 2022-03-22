package com.example.ProdyTalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.List;


@Repository
@Mapper
public interface CalendarMapper {
    List<Calendar> getCalendar();
}