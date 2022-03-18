package com.example.ProdyTalk.contoller;

import com.example.ProdyTalk.mapper.UserMapper;
import com.example.ProdyTalk.service.UserService;
import com.example.ProdyTalk.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;

@CrossOrigin(origins="*",maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Autowired
    UserMapper userMapper;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public void insertUser(@RequestBody UserVO user, HttpServletResponse response) throws IOException {
        userService.insertUser(user);
        System.out.println("유저 DB 저장 성공");
        //response.sendRedirect("http://localhost:3000/signup/result");
    }

    @GetMapping("/signup/result")
    public void success() {
        System.out.println("회원가입 성공!!!");
    }
    @PostMapping("/authenticate")
    public String authen(UserVO user){
        userService.findUser(user);
        System.out.println(userService.findUser(user));
        if (userService.findUser(user) != null) {
            System.out.println("유저 확인!!");

            Date now = new Date();

            return Jwts.builder()
                    .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // (1)
                    .setIssuer("fresh") // (2)
                    .setIssuedAt(now) // (3)
                    .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis())) // (4)
                    .claim("id", "아이디") // (5)
                    .claim("pwd", "비밀번호")
                    .signWith(SignatureAlgorithm.HS256, "secret") // (6)
                    .compact();

        } else {
            System.out.println("회원가입 안된 유저!!");
            return null;
        }
    }

    @GetMapping("/authenticate")
    public String autheddn(UserVO user) {
        return null;
    }
}