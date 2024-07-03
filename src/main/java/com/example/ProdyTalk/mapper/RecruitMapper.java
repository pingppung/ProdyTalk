package com.example.prodytalk.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.prodytalk.vo.RecruitVO;

import java.util.List;
import java.util.Optional;

@Repository
@Mapper
public interface RecruitMapper {
    List<RecruitVO> findAll(Integer recruit_id);

    List<RecruitVO> findStudy(Integer recruit_id);

    List<RecruitVO> findProject(Integer recruit_id);

    void save(RecruitVO recruit);

    Optional<Object> findById(Integer recruit_id);

    void update(RecruitVO recruit);

    void delete(RecruitVO recruit);
}
