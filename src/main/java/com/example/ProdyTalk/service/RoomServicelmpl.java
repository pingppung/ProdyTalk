package com.example.ProdyTalk.service;

import com.example.ProdyTalk.mapper.RoomMapper;
import com.example.ProdyTalk.vo.RoomJoinVO;
import com.example.ProdyTalk.vo.RoomListVO;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;


@Service
@RequiredArgsConstructor
public class RoomServicelmpl implements RoomService {
    private final RoomMapper roomMapper;

    @Override
    public void insertRoom(RoomListVO roomVO) {
        roomMapper.insertRoom(roomVO);
    }

    @Override
    public int findIdRoom(RoomListVO roomVO) {
        return roomMapper.findIdRoom(roomVO);
    }

    @Override
    public void joinRoom(RoomJoinVO room) {
        roomMapper.joinRoom(room);
        System.out.println(room);
    }

    @Override
    public List<RoomListVO> getAllRooms() {
        return roomMapper.findAll();
    }

    //유저가 속해있는 room 리스트 받아오기
    @Override
    public List<RoomJoinVO> findInRoom(String user_id) {
        return roomMapper.findInRoom(user_id);
    }

    @Override
    public List<RoomListVO> getInRooms(int[] room_id) {

        return roomMapper.getInRooms(room_id);
    }

}