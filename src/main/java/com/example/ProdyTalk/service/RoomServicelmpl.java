package com.example.ProdyTalk.service;

import com.example.ProdyTalk.mapper.RoomMapper;
import com.example.ProdyTalk.vo.RoomVO;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServicelmpl implements RoomService {
    private final RoomMapper roomMapper;

    @Override
    public void insertRoom(RoomVO room) {
        roomMapper.insertRoom(room);
    }

    @Override
    public List<RoomVO> getAllRooms() {
        return roomMapper.findAll();
    }
}