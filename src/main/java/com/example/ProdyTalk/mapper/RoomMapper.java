package com.example.ProdyTalk.mapper;

import java.util.List;

import com.example.ProdyTalk.vo.RoomVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface RoomMapper {
    void insertRoom(RoomVO room);
    List<RoomVO> findAll();
}