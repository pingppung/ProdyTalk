package com.example.prodytalk.service;

import java.util.List;

import com.example.prodytalk.vo.FileVO;

public interface FileService {
    // 파일 추가
    public void addFile(FileVO fileVO);

    // 모든 파일 검색
    public List<FileVO> findAllFiles(int room_id);

    // 파일 삭제
    public void deleteFile(String file_id);
}
