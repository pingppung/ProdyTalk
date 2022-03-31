package com.example.ProdyTalk.mapper;

import com.example.ProdyTalk.vo.RoomJoinVO;
import com.example.ProdyTalk.vo.RoomListVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
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
}