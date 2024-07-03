package com.example.prodytalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.chat.vo.MessageVO;

import java.util.List;

@Repository
@Mapper
public interface ChatMapper {
    void insertMessage(MessageVO message);

    int searchLast();

    List<MessageVO> getChatList(int conversation_id);

    int searchPersonalLast();

    void insertPersonalMessage(MessageVO message);

    List<MessageVO> getPersonalChatList(int conversation_id);
}
