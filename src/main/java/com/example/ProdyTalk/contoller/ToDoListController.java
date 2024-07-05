package com.example.prodytalk.contoller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.prodytalk.service.ToDoListService;
import com.example.prodytalk.vo.ToDoListVO;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class ToDoListController {
    private final ToDoListService toDoListService;

    @GetMapping("/api/todolist/id")
    public List<ToDoListVO> getToDoListById(@RequestParam(value = "room_id") int room_id) {
        return toDoListService.findToDoListByRoomId(room_id);
    }

    @PostMapping("/api/todolist/checked")
    public void updateChecked(@RequestBody ToDoListVO toDoListVO) {
        toDoListService.updateToDoItemChecked(toDoListVO);
    }

    @PostMapping("/api/todolist/add")
    public void addToDoList(@RequestBody ToDoListVO toDoListVO) {
        toDoListVO.setChecked(false);
        toDoListService.addToDoItem(toDoListVO);
    }

    @PostMapping("/api/todolist/delete")
    public void deleteToDoList(@RequestBody ToDoListVO toDoListVO) {
        toDoListService.deleteToDoItem(toDoListVO);
    }

    @GetMapping("/api/todolist/user")
    public List<ToDoListVO> getToDoListByUser(@RequestParam(value = "user_id") String user_id) {
        return toDoListService.findToDoListByUserId(user_id);
    }

    @PostMapping("/api/todolist/addByUser")
    public void addToDoListByUser(@RequestBody ToDoListVO toDoListVO) {
        toDoListVO.setChecked(false);
        toDoListService.addToDoItemByUserId(toDoListVO);
    }

}
