package com.example.prodytalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.RecruitVO;

import java.util.List;
import java.util.Optional;

@Repository
@Mapper
public interface RecruitMapper {
    List<RecruitVO> selectAllRecruits(Integer recruit_id);

    List<RecruitVO> selectStudyRecruits(Integer recruit_id);

    List<RecruitVO> selectProjectRecruits(Integer recruit_id);

    void insertRecruit(RecruitVO recruit);

    Optional<Object> selectRecruitById(Integer recruit_id);

    void updateRecruit(RecruitVO recruit);

    void deleteRecruit(RecruitVO recruit);
}
