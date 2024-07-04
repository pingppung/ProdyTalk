package com.example.prodytalk.service;

import org.springframework.stereotype.Service;

import com.example.prodytalk.mapper.RoomMapper;
import com.example.prodytalk.vo.RoomJoinVO;
import com.example.prodytalk.vo.RoomListVO;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServicelmpl implements RoomService {
    private final RoomMapper roomMapper;

    @Override
    public void addRoom(RoomListVO roomVO) {
        roomMapper.insertRoom(roomVO);
    }

    @Override
    public int findRoomId(RoomListVO roomVO) {
        return roomMapper.selectRoomId(roomVO);
    }

    @Override
    public void joinRoom(RoomJoinVO room) {
        roomMapper.joinRoom(room);
    }

    @Override
    public List<RoomListVO> findAllRooms() {
        return roomMapper.selectAllRooms();
    }

    @Override
    public List<RoomJoinVO> findRoomsByUserId(String user_id) {
        return roomMapper.selectRoomsByUserId(user_id);
    }

    @Override
    public List<RoomListVO> findRoomsByIds(int[] room_id) {
        return roomMapper.selectRoomsByIds(room_id);
    }

    @Override
    public int findRoomTotalMembers(int room_id) {
        return roomMapper.selectRoomTotalMembers(room_id);
    }

    @Override
    public void updateRoomTotalMembers(RoomListVO roomListVO) {
        roomMapper.updateRoomTotalMembers(roomListVO);
    }

    @Override
    public RoomListVO findRoomById(int room_id) {
        return roomMapper.selectRoomById(room_id);
    }

    @Override
    public List<RoomJoinVO> findMembersByRoomId(int room_id) {
        return roomMapper.selectMembersByRoomId(room_id);
    }

    @Override
    public void deleteRoomById(RoomJoinVO roomJoinVO) {
        roomMapper.deleteRoomById(roomJoinVO);
    }
}