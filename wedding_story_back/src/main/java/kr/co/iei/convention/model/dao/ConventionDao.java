package kr.co.iei.convention.model.dao;



import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.convention.model.dto.ConventionDTO;

@Mapper
public interface ConventionDao {

    ConventionDTO getTime();

    List selectConventionSeat();

    List selectConventionSeat(int i);

    boolean insertConvention(ConventionDTO convention);



}
