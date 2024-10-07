package kr.co.iei.consult.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dto.ProductDTO;

@Mapper
public interface ConsultDao {

	int insertConsult(ConsultDTO consult, MemberDTO member, ProductDTO product);

	ConsultDTO selectConsult(int consultNo);

	List selectConsultList(List productNo);

	


}
