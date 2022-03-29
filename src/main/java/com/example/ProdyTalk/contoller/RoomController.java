package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.RoomMapper;
import com.example.ProdyTalk.service.RoomService;
import com.example.ProdyTalk.vo.RoomListVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @Autowired
    RoomMapper roomMapper;

    @PostMapping("/createroom")
    public void insertUser(RoomListVO room, HttpServletResponse response) throws IOException {
        roomService.insertRoom(room);
        System.out.println("Room DB 저장 성공");
        response.sendRedirect("http://localhost:3000/");
    }

    @GetMapping("/roomlist")
    public List<RoomListVO> getAllRooms() {
        System.out.println("Room List 불러오기 성공");
        return roomService.getAllRooms();
    }

}