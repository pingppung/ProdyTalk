package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.UserMapper;
import com.example.ProdyTalk.service.UserService;
import com.example.ProdyTalk.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class PostController {
    private final UserService userService;

    @Autowired
    UserMapper userMapper;

    @PostMapping("/signup/result")
    public void insertUser(UserVO user, HttpServletResponse response) throws IOException {
        userService.insertUser(user);
        System.out.println("유저 DB 저장 성공");
        response.sendRedirect("http://localhost:3000/signup/result");
    }

    @GetMapping("/signup/result")
    public void success(){
        System.out.println("회원가입 성공!!!");
    }

    @PostMapping("/login")
    public void findUser(UserVO user, HttpServletResponse response) throws IOException {
        userService.findUser(user);
        System.out.println(userService.findUser(user));
        if(userService.findUser(user) == true) {
            System.out.println("유저 확인!!");
            response.sendRedirect("http://localhost:3000/");
        }
        else{
            System.out.println("회원가입 안된 유저!!");
            response.sendRedirect("http://localhost:3000/login");
        }
    }
}