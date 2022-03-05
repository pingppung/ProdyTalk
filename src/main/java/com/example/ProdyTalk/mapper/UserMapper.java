package com.example.ProdyTalk.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.example.ProdyTalk.vo.UserVO;


@Mapper
public interface UserMapper {

    List<UserVO> userList();
    UserVO fetchUserByID(String id);
    void updateUser(UserVO user);
    void insertUser(UserVO user);
    void deleteUser(String id);

}
