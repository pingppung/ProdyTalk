package com.example.prodytalk.service;

import java.util.List;

import com.example.prodytalk.vo.MessageVO;

public interface ChatService {
    // 그룹채팅용
    public void addGroupMessage(MessageVO messageVO);

    // 가장 최근 그룹 메시지의 ID를 검색
    public int findLastGroupMessageId();

    // 특정 그룹 채팅의 모든 메시지 검색
    public List<MessageVO> findGroupMessages(int conversation_id);

    // 개인채팅용
    public int findLastPersonalMessageId();

    // 가장 최근 개인 메시지의 ID를 검색
    public void addPersonalMessage(MessageVO messageVO);

    // 특정 개인 채팅의 모든 메시지 검색
    public List<MessageVO> findPersonalMessages(int conversation_id);
}