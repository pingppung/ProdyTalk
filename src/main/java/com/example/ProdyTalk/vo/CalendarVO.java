package com.example.prodytalk.vo;

import lombok.Data;

@Data
public class CalendarVO {
    int calendar_id;
    String title;
    String start;
    String end;
    String color;
    int room_id;
}
