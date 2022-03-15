package com.example.ProdyTalk.chat.controller;

import com.example.ProdyTalk.chat.domain.Chat;
import com.example.ProdyTalk.chat.vo.Message;
import com.example.ProdyTalk.chat.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;


import com.example.ProdyTalk.chat.domain.Greeting;
import com.example.ProdyTalk.chat.domain.HelloMessage;

import java.util.HashSet;
import java.util.Set;

@Controller
public class GreetingController {

    private static Set<String> userList = new HashSet<>();

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @MessageMapping("/chat/{toName}")
    @SendTo("/queue/addChatToClient/{toName}")
    public Message sendMessage(Message messageVO, @DestinationVariable String toName){
        //this.simpMessagingTemplate.convertAndSend("/queue/addChatToClient/"+toName,messageVO.getContent());
        return new Message(messageVO.getContent());
    }

    @MessageMapping("/join")
    public void joinUser(User user) throws Exception {
        userList.add(user.getName());
        userList.forEach(use->System.out.println(use));
    }

}
