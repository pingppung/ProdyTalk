package com.example.prodytalk.service;

import java.util.List;

import com.example.prodytalk.vo.FileVO;

public interface FileService {
    public void insertFile(FileVO fileVO);

    public List<FileVO> getAllFiles(int room_id);

    public void deleteFile(String file_id);
}
