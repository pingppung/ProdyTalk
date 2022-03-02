package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.UserMapper;
import com.example.ProdyTalk.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequestMapping("/")
public class PostController {

    @Autowired
    UserMapper userMapper;

    @PostMapping("/signup")
    public String insertUser(UserVO user){
        userMapper.insertUser(user);
        System.out.println("유저 DB 저장 성공");
        return "";
    }
}
