package com.example.ProdyTalk.service;

import com.example.ProdyTalk.mapper.UserMapper;
import com.example.ProdyTalk.vo.UserVO;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServicelmpl implements UserService {
    private final UserMapper userMapper;

    @Override
    public void insertUser(UserVO user) {
        userMapper.insertUser(user);
    }

}
