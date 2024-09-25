package kr.co.iei.consult.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.member.model.dto.MemberDTO;

@Mapper
public interface ConsultDao {

	int insertConsult(ConsultDTO consult, MemberDTO member);

}
