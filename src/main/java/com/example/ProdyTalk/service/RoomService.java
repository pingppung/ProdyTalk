package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.RoomListVO;

import java.util.List;

public interface RoomService {
    public void insertRoom(RoomListVO room);
    public List<RoomListVO> getAllRooms();
}
