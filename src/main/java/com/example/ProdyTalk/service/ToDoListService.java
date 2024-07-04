package com.example.prodytalk.service;

import java.util.List;

import com.example.prodytalk.vo.ToDoListVO;

public interface ToDoListService {

    List<ToDoListVO> findToDoListByRoomId(int room_id);

    void updateToDoItemChecked(ToDoListVO todoListVO);

    void addToDoItem(ToDoListVO todoListVO);

    void deleteToDoItem(ToDoListVO todoListVO);

    List<ToDoListVO> findToDoListByUserId(String user_id);

    void addToDoItemByUserId(ToDoListVO todoListVO);
}
