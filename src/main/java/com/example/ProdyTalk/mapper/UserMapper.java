package com.example.ProdyTalk.mapper;

import java.util.List;

import org.apache.catalina.User;
import org.apache.ibatis.annotations.Mapper;
import com.example.ProdyTalk.vo.UserVO;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserMapper {

    List<UserVO> userList();
    UserVO fetchUserByID(int id);
    void updateUser(UserVO user);
    void insertUser(UserVO user);
    void deleteUser(int id);
}
