package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.RoomVO;
import com.example.ProdyTalk.vo.UserVO;

import java.util.List;

public interface RoomService {
    public void insertRoom(RoomVO room);
    public List<RoomVO> getAllRooms();
}
