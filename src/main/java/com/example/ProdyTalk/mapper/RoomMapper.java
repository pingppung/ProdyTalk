package com.example.ProdyTalk.mapper;

import com.example.ProdyTalk.vo.RoomListVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@Mapper
public interface RoomMapper {
    void insertRoom(RoomListVO room);
    List<RoomListVO> findAll();
}