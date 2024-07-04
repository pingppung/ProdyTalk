package com.example.prodytalk.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.UserVO;

@Repository
@Mapper
public interface UserMapper {
    List<UserVO> selectAllUsers();

    UserVO selectUserById(String user_id);

    UserVO selectUser(UserVO user);

    void updateUser(UserVO user);

    void insertUser(UserVO user);

    void deleteUserById(String id);
}