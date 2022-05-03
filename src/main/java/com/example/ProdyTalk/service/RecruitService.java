package com.example.ProdyTalk.service;

import com.example.ProdyTalk.vo.RecruitVO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RecruitService {
    public List<RecruitVO> getAllRecruit();
    public void createRecruit(RecruitVO recruit);
    public ResponseEntity<RecruitVO> getRecruit(Integer recruit_id);
    public void updateRecruit(RecruitVO updateRecruit);
    public void deleteRecruitByNo(RecruitVO recruit);
}
