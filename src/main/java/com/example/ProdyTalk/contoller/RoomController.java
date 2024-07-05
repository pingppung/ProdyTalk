package com.example.prodytalk.contoller;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import com.example.prodytalk.service.RoomService;
import com.example.prodytalk.vo.RoomJoinVO;
import com.example.prodytalk.vo.RoomListVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@Slf4j
public class RoomController {
    private final RoomService roomService;

    @Value("${jwt.key}")
    private String key;

    @PostMapping("/createroom")
    public void insertUser(@RequestBody RoomListVO room, HttpServletRequest request) {
        room.setRoom_total(1);
        roomService.addRoom(room);
        log.debug("Room DB 저장 성공");

        int room_id = roomService.findRoomId(room); // 방 id 가지고 오기

        // 어떤 유저가 방을 만드는 건지 token을 이용해 유저id 알아내기
        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().get("id", String.class);
        log.debug(user_id + "가 방" + room_id + "을 생성했습니다.");

        RoomJoinVO join = new RoomJoinVO();
        join.setRoom_id(room_id);
        join.setUser_id(user_id);

        roomService.joinRoom(join);
    }

    @GetMapping("/roomlist")
    public List<RoomListVO> getAllRooms(HttpServletRequest request) {

        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().get("id", String.class);

        List<RoomJoinVO> room_ids = roomService.findRoomsByUserId(user_id);
        int[] room_id = new int[room_ids.size()];

        for (int i = 0; i < room_ids.size(); i++) {
            room_id[i] = room_ids.get(i).getRoom_id();
        }

        return roomService.findRoomsByIds(room_id);
    }

    @GetMapping("/api/enterRoom")
    public void enterRoom(@RequestParam("roomId") int room_id,
            HttpServletResponse response,
            HttpServletRequest request) throws IOException {
        log.debug("룸 아이디는" + room_id + "입니다.");

        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().get("id", String.class);

        RoomJoinVO roomJoinVO = new RoomJoinVO();
        roomJoinVO.setRoom_id(room_id);
        roomJoinVO.setUser_id(user_id);
        roomService.joinRoom(roomJoinVO);

        RoomListVO roomListVO = new RoomListVO();
        int room_total = roomService.findRoomTotalMembers(room_id);
        roomListVO.setRoom_id(room_id);
        roomListVO.setRoom_total(room_total + 1);

        roomService.updateRoomTotalMembers(roomListVO);
        response.sendRedirect("http://prodytalk.icu:3000/main");
        // response.sendRedirect("http://localhost:3000/main");
    }

    @GetMapping("/api/getroom")
    public RoomListVO getRoomById(@RequestParam(value = "room_id") int room_id) {
        return roomService.findRoomById(room_id);
    }

    @GetMapping("/api/getmember")
    public List<RoomJoinVO> getMemberById(@RequestParam(value = "room_id") int room_id) {
        return roomService.findMembersByRoomId(room_id);
    }

    @PostMapping("/api/deleteRoom")
    public void deleteRoom(@RequestBody RoomJoinVO roomJoinVO, HttpServletRequest request) {
        RoomListVO roomListVO = new RoomListVO();
        int room_total = roomService.findRoomTotalMembers(roomJoinVO.getRoom_id());
        roomListVO.setRoom_id(roomJoinVO.getRoom_id());
        roomListVO.setRoom_total(room_total - 1);

        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());
        String user_id = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().get("id", String.class);
        roomJoinVO.setUser_id(user_id);

        roomService.updateRoomTotalMembers(roomListVO);
        roomService.deleteRoomById(roomJoinVO);
    }

}