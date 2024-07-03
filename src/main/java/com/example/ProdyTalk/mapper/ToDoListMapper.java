package com.example.prodytalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.ToDoListVO;

import java.util.List;

@Repository
@Mapper
public interface ToDoListMapper {
    List<ToDoListVO> getToDoListById(int room_id);

    void setChecked(ToDoListVO toDoListVO);

    void addToDoList(ToDoListVO toDoListVO);

    void deleteToDoList(ToDoListVO toDoListVO);

    List<ToDoListVO> getToDoListByUser(String user_id);

    void addToDoListByUser(ToDoListVO toDoListVO);
}
