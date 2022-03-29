package com.example.ProdyTalk.mapper;

import com.example.ProdyTalk.chat.vo.MessageVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ChatMapper {
    void insertMessage(MessageVO message);
    int searchLast();
}

