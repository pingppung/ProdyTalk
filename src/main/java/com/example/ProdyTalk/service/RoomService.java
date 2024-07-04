package com.example.prodytalk.service;

import java.util.List;

import com.example.prodytalk.vo.RoomJoinVO;
import com.example.prodytalk.vo.RoomListVO;

public interface RoomService {

    // 방 추가
    public void addRoom(RoomListVO room);

    // 방 ID 찾기
    public int findRoomId(RoomListVO room);

    // 방 참여
    public void joinRoom(RoomJoinVO room);

    // 모든 방 데이터 가져오기
    public List<RoomListVO> findAllRooms();

    // 사용자가 참여한 방 찾기
    public List<RoomJoinVO> findRoomsByUserId(String user_id);

    // 여러 방 ID에 해당하는 방 목록 가져오기
    public List<RoomListVO> findRoomsByIds(int[] room_id);

    // 방의 총 인원 수 가져오기
    public int findRoomTotalMembers(int room_id);

    // 방의 총 인원 수 설정하기
    public void updateRoomTotalMembers(RoomListVO roomListVO);

    // 특정 방 ID에 해당하는 방 정보 가져오기
    public RoomListVO findRoomById(int room_id);

    // 특정 방의 회원 목록 가져오기
    public List<RoomJoinVO> findMembersByRoomId(int room_id);

    // 방 삭제
    public void deleteRoomById(RoomJoinVO roomJoinVO);
}