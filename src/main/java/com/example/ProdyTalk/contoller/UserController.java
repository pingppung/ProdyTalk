package com.example.prodytalk.contoller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import com.example.prodytalk.service.UserService;
import com.example.prodytalk.vo.UserVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @Value("${jwt.key}")
    private String key;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public void addUser(@RequestBody UserVO user, HttpServletResponse response) throws IOException {
        userService.addUser(user);
        log.debug("유저 DB 저장 성공");
    }

    @PostMapping("/authenticate")
    public String authenticate(@RequestBody UserVO user) {
        userService.findUser(user);
        if (userService.findUser(user) != null) {
            log.debug("유저 확인!!");

            Date now = new Date();

            return Jwts.builder()
                    .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                    .setIssuer("fresh")
                    .setIssuedAt(now)
                    .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis()))
                    .claim("id", user.getUser_id())
                    .claim("pwd", user.getUser_pwd())
                    .signWith(SignatureAlgorithm.HS256, key)
                    .compact();

        } else {
            log.error("회원가입 안된 유저!!");
            throw new IllegalArgumentException("회원가입 안됨.");
        }
    }

    // 토큰으로 유저 아이디 확인 => 아이디 넘기기
    @GetMapping("/authenticate")
    public Claims verifyToken(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION).substring("Bearer ".length());

        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }

    @GetMapping("/api/getUser")
    public UserVO getUserById(@RequestParam(value = "user_id") String user_id) {
        return userService.findUserById(user_id);
    }

    @PostMapping("/api/editUser")
    public void updateUser(@RequestBody UserVO userVO) {
        userService.updateUser(userVO);
        System.out.println(userVO);
    }
}