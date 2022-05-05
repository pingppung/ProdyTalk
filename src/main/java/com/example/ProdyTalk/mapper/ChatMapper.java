package com.example.ProdyTalk.mapper;

import com.example.ProdyTalk.chat.vo.MessageVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

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

