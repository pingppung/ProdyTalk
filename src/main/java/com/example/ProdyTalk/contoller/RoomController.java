package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.RoomMapper;
import com.example.ProdyTalk.service.RoomService;
import com.example.ProdyTalk.vo.RoomJoinVO;
import com.example.ProdyTalk.vo.RoomListVO;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @Autowired
    RoomMapper roomMapper;

    @PostMapping("/createroom")
    public void insertUser(@RequestBody RoomListVO room, HttpServletRequest request) {
        roomService.insertRoom(room);
        System.out.println("Room DB 저장 성공");

        //유저가 속한 방만 띄우기 위한 부분
        int room_id = roomService.findIdRoom(room);  //방 id 가지고 오기

        //어떤 유저가 방을 만드는 건지 token을 이용해 유저id 알아내기
        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().get("id",String.class);
        System.out.println(room_id + "   "+ user_id);

        RoomJoinVO join = new RoomJoinVO();
        join.setRoom_id(room_id);
        join.setUser_id(user_id);

        roomService.joinRoom(join);

        //  response.sendRedirect("http://localhost:3000/");
    }


    @GetMapping("/roomlist")
    public List<RoomListVO> getAllRooms(HttpServletRequest request) {

        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().get("id",String.class);

        List<RoomJoinVO> room_ids = roomService.findInRoom(user_id);
        int[] room_id=new int[room_ids.size()];

        for (int i=0; i<room_ids.size(); i++) {
            room_id[i]=room_ids.get(i).getRoom_id();
        }

        return roomService.getInRooms(room_id);
    }

}