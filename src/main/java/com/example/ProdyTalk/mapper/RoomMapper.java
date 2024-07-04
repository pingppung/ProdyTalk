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

    List<RoomListVO> selectAllRooms();

    List<RoomJoinVO> selectRoomsByUserId(String user_id);

    List<RoomListVO> selectRoomsByIds(int[] room_id);

    int selectRoomId(RoomListVO room);

    void joinRoom(RoomJoinVO room);

    int selectRoomTotalMembers(int room_id);

    void updateRoomTotalMembers(RoomListVO roomListVO);

    RoomListVO selectRoomById(int room_id);

    List<RoomJoinVO> selectMembersByRoomId(int room_id);

    void deleteRoomById(RoomJoinVO roomJoinVO);
}