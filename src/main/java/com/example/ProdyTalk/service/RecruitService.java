package com.example.prodytalk.service;

import org.springframework.http.ResponseEntity;

import com.example.prodytalk.vo.RecruitVO;

import java.util.List;

public interface RecruitService {
    // 모든 모집 데이터 가져오기
    public List<RecruitVO> findAllRecruits(Integer recruit_id);

    // 특정 ID의 모집 데이터 가져오기
    public ResponseEntity<RecruitVO> findRecruitById(Integer recruit_id);

    // 스터디 모집 데이터 가져오기
    public List<RecruitVO> findStudyRecruits(Integer recruit_id);

    // 프로젝트 모집 데이터 가져오기
    public List<RecruitVO> findProjectRecruits(Integer recruit_id);

    // 모집 생성
    public void addRecruit(RecruitVO recruit);

    // 모집 업데이트
    public void modfiyRecruit(RecruitVO updateRecruit);

    // 모집 삭제
    public void deleteRecruit(RecruitVO recruit);
}
