package com.example.ProdyTalk.mapper;

import com.example.ProdyTalk.vo.ToDoListVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ToDoListMapper {
    List<ToDoListVO> getToDoListById(int room_id);
    void setChecked(ToDoListVO toDoListVO);
    void addToDoList(ToDoListVO toDoListVO);
}
