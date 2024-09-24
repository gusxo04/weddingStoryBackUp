package kr.co.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.MemberDTO;

@Mapper
public interface MemberDao {

	int checkId(String checkId);

	int checkCode(String checkCode);

	int checkLastMemberCode();

	int checkLastCompanyNo();

	int insertMember(MemberDTO member);

	String checkPartnerCode(String partnerId);

}
