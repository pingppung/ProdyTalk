package com.example.ProdyTalk.mapper;

import com.example.ProdyTalk.vo.RecruitVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Mapper
public interface RecruitMapper {
    List<RecruitVO> findAll();
    List<RecruitVO> findStudy();
    List<RecruitVO> findProject();
    void save(RecruitVO recruit);
    Optional<Object> findById(Integer recruit_id);
    void update(RecruitVO recruit);
    void delete(RecruitVO recruit);
}
