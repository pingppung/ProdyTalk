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

    @Override
    public UserVO getUserById(String user_id) {
        return userMapper.getUserById(user_id);
    }

    @Override
    public void editUser(UserVO userVO) {
        userMapper.editUser(userVO);
    }

    @Override
    public UserVO findUser(UserVO user) {
        return userMapper.findUser(user);
    }
}