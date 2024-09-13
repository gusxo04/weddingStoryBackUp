package kr.co.iei.convention.model.dao;



import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.convention.model.dto.ConventionDTO;

@Mapper
public interface ConventionDao {

    ConventionDTO getTime();



}
