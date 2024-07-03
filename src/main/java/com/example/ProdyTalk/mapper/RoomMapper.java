package com.example.prodytalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.RoomJoinVO;
import com.example.prodytalk.vo.RoomListVO;

import java.util.List;

@Repository
@Mapper
public interface RoomMapper {
    void insertRoom(RoomListVO room);

    List<RoomListVO> findAll();

    List<RoomJoinVO> findInRoom(String user_id);

    List<RoomListVO> getInRooms(int[] room_id);

    public int findIdRoom(RoomListVO room);

    void joinRoom(RoomJoinVO room);

    int getRoomTotal(int room_id);

    void setRoomTotal(RoomListVO roomListVO);

    RoomListVO getRoomById(int room_id);

    List<RoomJoinVO> getMemberById(int room_id);

    void deleteRoom(RoomJoinVO roomJoinVO);
}