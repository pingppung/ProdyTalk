package com.example.prodytalk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.prodytalk.mapper.ToDoListMapper;
import com.example.prodytalk.vo.ToDoListVO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ToDoListServicelmpl implements ToDoListService {
    private final ToDoListMapper toDoListMapper;

    @Override
    public List<ToDoListVO> findToDoListByRoomId(int room_id) {
        return toDoListMapper.selectToDoListByRoomId(room_id);
    }

    @Override
    public void updateToDoItemChecked(ToDoListVO toDoListVO) {
        toDoListMapper.updateTodoItemChecked(toDoListVO);
    }

    @Override
    public void addToDoItem(ToDoListVO todoListVO) {
        toDoListMapper.insertTodoItem(todoListVO);
    }

    @Override
    public void deleteToDoItem(ToDoListVO todoListVO) {
        toDoListMapper.deleteTodoItem(todoListVO);
    }

    @Override
    public List<ToDoListVO> findToDoListByUserId(String user_id) {
        return toDoListMapper.selectToDoListByUserId(user_id);
    }

    @Override
    public void addToDoItemByUserId(ToDoListVO todoListVO) {
        toDoListMapper.insertToDoItemByUserId(todoListVO);
    }
}
