package com.example.prodytalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.MessageVO;

import java.util.List;

@Repository
@Mapper
public interface ChatMapper {
    void insertGroupMessage(MessageVO message);

    int selectLastGroupMessageId();

    List<MessageVO> selectGroupMessages(int conversation_id);

    int selectLastPersonalMessageId();

    void insertPersonalMessage(MessageVO message);

    List<MessageVO> selectPersonalMessages(int conversation_id);
}
