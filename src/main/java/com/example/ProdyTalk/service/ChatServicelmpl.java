package com.example.prodytalk.service;

import org.springframework.stereotype.Service;

import com.example.prodytalk.mapper.ChatMapper;
import com.example.prodytalk.vo.MessageVO;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServicelmpl implements ChatService {
    private final ChatMapper chatMapper;

    @Override
    public void addGroupMessage(MessageVO messageVO) {
        chatMapper.insertGroupMessage(messageVO);
    }

    @Override
    public int findLastGroupMessageId() {
        return chatMapper.selectLastGroupMessageId();
    }

    @Override
    public List<MessageVO> findGroupMessages(int conversation_id) {
        return chatMapper.selectGroupMessages(conversation_id);
    }

    @Override
    public int findLastPersonalMessageId() {
        return chatMapper.selectLastPersonalMessageId();
    }

    @Override
    public void addPersonalMessage(MessageVO messageVO) {
        chatMapper.insertPersonalMessage(messageVO);
    }

    @Override
    public List<MessageVO> findPersonalMessages(int conversation_id) {
        return chatMapper.selectPersonalMessages(conversation_id);
    }

}