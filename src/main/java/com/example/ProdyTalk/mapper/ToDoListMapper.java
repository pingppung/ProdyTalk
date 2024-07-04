package com.example.prodytalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.ToDoListVO;

import java.util.List;

@Repository
@Mapper
public interface ToDoListMapper {
    List<ToDoListVO> selectToDoListByRoomId(int room_id);

    void updateTodoItemChecked(ToDoListVO toDoListVO);

    void insertTodoItem(ToDoListVO toDoListVO);

    void deleteTodoItem(ToDoListVO toDoListVO);

    List<ToDoListVO> selectToDoListByUserId(String user_id);

    void insertToDoItemByUserId(ToDoListVO toDoListVO);
}
