package com.example.prodytalk.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.UserVO;

@Repository
@Mapper
public interface UserMapper {
    List<UserVO> userList();

    UserVO fetchUserByID(String id);

    UserVO findUser(UserVO user);

    void updateUser(UserVO user);

    void insertUser(UserVO user);

    void deleteUser(String id);

    UserVO getUserById(String user_id);

    void editUser(UserVO userVO);
}