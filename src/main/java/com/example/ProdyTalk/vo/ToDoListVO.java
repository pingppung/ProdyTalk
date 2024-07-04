package com.example.prodytalk.vo;

import lombok.Data;

@Data
public class ToDoListVO {
    int todolist_id;
    String user_id;
    String content;
    int room_id;
    boolean checked;
}
