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