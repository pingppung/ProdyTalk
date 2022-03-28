package com.example.ProdyTalk.chat.controller;

import com.example.ProdyTalk.chat.vo.MessageVO;
import com.example.ProdyTalk.mapper.ChatMapper;
import com.example.ProdyTalk.service.ChatService;
import com.example.ProdyTalk.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class GreetingController {

    private final ChatService chatService;
    private static Set<String> userList = new HashSet<>();

    @Autowired
    ChatMapper chatMapper;

    private SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/chat/{toId}")
    public void sendMessage(MessageVO messageVO, @DestinationVariable String toId){

        int messageId=chatService.searchLast();
        messageVO.setMessage_id(messageId+1);
        chatService.insertMessage(messageVO);

        System.out.println("메시지 내용 저장 성공");

        this.simpMessagingTemplate.convertAndSend("/queue/addChatToClient/"+toId,messageVO);
    }

    @MessageMapping("/join")
    public void joinUser(UserVO userVO) throws Exception {
        userList.add(userVO.getUser_name());
        userList.forEach(use->System.out.println(use));
    }

}
