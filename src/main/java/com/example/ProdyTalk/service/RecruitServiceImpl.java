package com.example.ProdyTalk.service;

import com.example.ProdyTalk.exception.ResourceNotFoundException;
import com.example.ProdyTalk.mapper.RecruitMapper;
import com.example.ProdyTalk.vo.RecruitVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruitServiceImpl implements RecruitService{
    private final RecruitMapper recruitMapper;

    // 글 목록
    @Override
    public List<RecruitVO> getAllRecruit() {
        return recruitMapper.findAll();
    }

    // 글 작성
    @Override
    public void createRecruit(RecruitVO recruit) {
        recruitMapper.save(recruit);
    }

    // 글 상세보기
    @Override
    public ResponseEntity<RecruitVO> getRecruit(Integer recruit_id) {
        RecruitVO recruit = (RecruitVO) recruitMapper.findById(recruit_id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+recruit_id+"]"));
        return ResponseEntity.ok(recruit);
    }

    // 글 수정
    @Override
    public void updateRecruit(RecruitVO updateRecruit) {
        recruitMapper.update(updateRecruit);
    }

    // 글 삭제
    @Override
    public void deleteRecruitByNo(RecruitVO recruit) {
        recruitMapper.delete(recruit);
    }
}
