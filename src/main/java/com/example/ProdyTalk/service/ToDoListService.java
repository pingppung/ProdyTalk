package com.example.prodytalk.service;

import java.util.List;

import com.example.prodytalk.vo.ToDoListVO;

public interface ToDoListService {

    List<ToDoListVO> getToDoListById(int room_id);

    void setChecked(ToDoListVO todoListVO);

    void addToDoList(ToDoListVO todoListVO);

    void deleteToDoList(ToDoListVO todoListVO);

    List<ToDoListVO> getToDoListByUser(String user_id);

    void addToDoListByUser(ToDoListVO todoListVO);
}
