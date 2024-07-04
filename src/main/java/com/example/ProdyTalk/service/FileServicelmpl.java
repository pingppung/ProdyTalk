package com.example.prodytalk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.prodytalk.mapper.FileMapper;
import com.example.prodytalk.vo.FileVO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FileServicelmpl implements FileService {
    private final FileMapper fileMapper;

    @Override
    public void addFile(FileVO fileVO) {
        fileMapper.insertFile(fileVO);
    }

    @Override
    public List<FileVO> findAllFiles(int room_id) {
        return fileMapper.selectAllFiles(room_id);
    }

    @Override
    public void deleteFile(String file_id) {
        fileMapper.deleteFile(file_id);
    }
}