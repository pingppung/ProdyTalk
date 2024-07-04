package com.example.prodytalk.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.prodytalk.exception.ResourceNotFoundException;
import com.example.prodytalk.mapper.RecruitMapper;
import com.example.prodytalk.vo.RecruitVO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruitServiceImpl implements RecruitService {
    private final RecruitMapper recruitMapper;

    @Override
    public List<RecruitVO> findAllRecruits(Integer recruit_id) {
        return recruitMapper.selectAllRecruits(recruit_id);
    }

    @Override
    public List<RecruitVO> findStudyRecruits(Integer recruit_id) {
        return recruitMapper.selectStudyRecruits(recruit_id);
    }

    @Override
    public List<RecruitVO> findProjectRecruits(Integer recruit_id) {
        return recruitMapper.selectProjectRecruits(recruit_id);
    }

    @Override
    public void addRecruit(RecruitVO recruit) {
        recruitMapper.insertRecruit(recruit);
    }

    @Override
    public ResponseEntity<RecruitVO> findRecruitById(Integer recruit_id) {
        RecruitVO recruit = (RecruitVO) recruitMapper.selectRecruitById(recruit_id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : [" + recruit_id + "]"));
        return ResponseEntity.ok(recruit);
    }

    // 글 수정
    @Override
    public void modfiyRecruit(RecruitVO updateRecruit) {
        recruitMapper.updateRecruit(updateRecruit);
    }

    // 글 삭제
    @Override
    public void deleteRecruit(RecruitVO recruit) {
        recruitMapper.deleteRecruit(recruit);
    }
}
