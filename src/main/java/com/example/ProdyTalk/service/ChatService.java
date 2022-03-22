package com.example.ProdyTalk.service;

import com.example.ProdyTalk.chat.vo.MessageVO;

public interface ChatService {
    public void insertMessage(MessageVO messageVO);
    public int searchLast();

}