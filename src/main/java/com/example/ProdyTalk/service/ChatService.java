package com.example.prodytalk.service;

import java.util.List;

import com.example.prodytalk.chat.vo.MessageVO;

public interface ChatService {
    // 그룹채팅용
    public void insertMessage(MessageVO messageVO);

    public int searchLast();

    public List<MessageVO> getChatList(int conversation_id);

    // 개인채팅용
    public int searchPersonalLast();

    public void insertPersonalMessage(MessageVO messageVO);

    public List<MessageVO> getPersonalChatList(int conversation_id);
}