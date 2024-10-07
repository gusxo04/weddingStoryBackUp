package kr.co.iei.consult.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface ConsultDao {

	int insertConsult(ConsultDTO consult, MemberDTO member, ProductDTO product);

	ConsultDTO selectConsult(int consultNo);
	
	//세영이가 마이페이지 일정관리에서 상담 일정 삭제할때 사용함
	int deleteConsult(int consultNo);

	List selectConsultList(List productNo, PageInfo pi);

	int totalConsultCount(List productNo);

	


}
