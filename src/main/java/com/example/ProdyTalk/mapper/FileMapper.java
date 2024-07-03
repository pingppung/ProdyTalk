package com.example.prodytalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.FileVO;

import java.util.List;

@Repository
@Mapper
public interface FileMapper {
    void insertFile(FileVO fileVO);

    List<FileVO> getAllFiles(int room_id);

    void deleteFile(String file_id);
}
