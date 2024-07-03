package com.example.prodytalk.service;

import org.springframework.stereotype.Service;

import com.example.prodytalk.chat.vo.MessageVO;
import com.example.prodytalk.mapper.ChatMapper;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServicelmpl implements ChatService {
    private final ChatMapper chatMapper;

    @Override
    public void insertMessage(MessageVO messageVO) {
        chatMapper.insertMessage(messageVO);
    }

    @Override
    public int searchLast() {
        return chatMapper.searchLast();
    }

    @Override
    public List<MessageVO> getChatList(int conversation_id) {
        return chatMapper.getChatList(conversation_id);
    }

    @Override
    public int searchPersonalLast() {
        return chatMapper.searchPersonalLast();
    }

    @Override
    public void insertPersonalMessage(MessageVO messageVO) {
        chatMapper.insertPersonalMessage(messageVO);
    }

    @Override
    public List<MessageVO> getPersonalChatList(int conversation_id) {
        return chatMapper.getPersonalChatList(conversation_id);
    }

}