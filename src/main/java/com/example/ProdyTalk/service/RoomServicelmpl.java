package com.example.ProdyTalk.service;

import com.example.ProdyTalk.mapper.RoomMapper;
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
    public List<RoomListVO> getAllRooms() {
        return roomMapper.findAll();
    }
}