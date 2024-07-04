package com.example.prodytalk.service;

import org.springframework.stereotype.Service;

import com.example.prodytalk.mapper.UserMapper;
import com.example.prodytalk.vo.UserVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServicelmpl implements UserService {
    private final UserMapper userMapper;

    @Override
    public void addUser(UserVO user) {
        userMapper.insertUser(user);
    }

    @Override
    public UserVO findUserById(String user_id) {
        return userMapper.selectUserById(user_id);
    }

    @Override
    public void updateUser(UserVO userVO) {
        userMapper.updateUser(userVO);
    }

    @Override
    public UserVO findUser(UserVO user) {
        return userMapper.selectUser(user);
    }
}