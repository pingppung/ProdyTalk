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
    public void enterRoom(@RequestParam("roomId") int roomId,
                          HttpServletResponse response,
                          HttpServletRequest request) throws IOException {
    
        log.debug("룸 아이디는 " + roomId + " 입니다.");
    
        try {
            // 1. roomId 유효성 체크
            if (roomId <= 0) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "❌ 유효하지 않은 방 ID입니다.");
                return;
            }
    
            // 2. 토큰에서 userId 추출
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "❌ 인증 토큰이 없습니다.");
                return;
            }
    
            String token = authHeader.substring("Bearer ".length());
            String userId = Jwts.parser().setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody()
                    .get("id", String.class);
    
            if (userId == null || userId.isEmpty()) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "❌ 토큰에서 사용자 정보를 확인할 수 없습니다.");
                return;
            }
    
            // 3. 참여 요청 객체 생성
            RoomJoinVO roomJoinVO = new RoomJoinVO();
            roomJoinVO.setRoom_id(roomId);
            roomJoinVO.setUser_id(userId);
    
            try {
                // 4. 방 참여 시도 (중복이면 DuplicateKeyException 발생)
                roomService.joinRoom(roomJoinVO);
            } catch (DuplicateKeyException e) {
                log.info("이미 참여 중인 사용자입니다: userId=" + userId + ", roomId=" + roomId);
                // 중복일 경우 인원수 업데이트만 진행 → 넘어감
            }
    
            // 5. 항상 DB에서 실제 인원 수를 COUNT 기반으로 집계
            int roomTotal = roomService.countMembersByRoomId(roomId);
    
            RoomListVO roomListVO = new RoomListVO();
            roomListVO.setRoom_id(roomId);
            roomListVO.setRoom_total(roomTotal);
            roomService.updateRoomTotalMembers(roomListVO);
    
            // 6. 정상적으로 처리된 경우 → 메인 페이지로 리다이렉트
            response.sendRedirect("http://prodytalk.icu:3000/main");
            // response.sendRedirect("http://localhost:3000/main");
    
        } catch (Exception e) {
            // 예기치 못한 서버 오류 처리
            log.error("방 입장 처리 중 오류 발생: " + e.getMessage(), e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "❌ 방 입장 중 오류가 발생했습니다.");
        }
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
