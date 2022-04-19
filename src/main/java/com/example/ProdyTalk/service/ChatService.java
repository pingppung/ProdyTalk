package com.example.ProdyTalk.service;

import com.example.ProdyTalk.chat.vo.MessageVO;

import java.util.List;

public interface ChatService {
    public void insertMessage(MessageVO messageVO);
    public int searchLast();
    public List<MessageVO> getChatList(int conversation_id);
}