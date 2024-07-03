package com.example.prodytalk.service;

import com.example.prodytalk.vo.UserVO;

public interface UserService {
    public void insertUser(UserVO user);

    public UserVO findUser(UserVO user);

    public UserVO getUserById(String user_id);

    public void editUser(UserVO userVO);
}
