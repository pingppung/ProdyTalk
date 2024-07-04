package com.example.prodytalk.service;

import com.example.prodytalk.vo.UserVO;

public interface UserService {
    public void addUser(UserVO user);

    public UserVO findUser(UserVO user);

    public UserVO findUserById(String user_id);

    public void updateUser(UserVO userVO);
}
