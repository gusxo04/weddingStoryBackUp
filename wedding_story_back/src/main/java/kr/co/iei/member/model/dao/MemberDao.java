package kr.co.iei.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.member.model.dto.MemberDTO;

@Mapper
public interface MemberDao {

	int checkId(String checkId);

	int checkCode(String checkCode);

	int adminTotalCount();

	List getMemberList(PageInfo pi);

	List selectCompanyContainList(String companyNo);

	int checkLastMemberCode();

	int checkLastCompanyNo();

	int insertMember(MemberDTO member);

	String checkPartnerCode(String partnerId);

	int updateMember(String partnerId, String memberName, String memberId);

	MemberDTO getPartner(int myNo, String myCode);

	int delete(int memberNo);
	
	MemberDTO searchPw(String memberId);

	String checkBusinessNo(String companyBusinessNo);

	MemberDTO selectMemberConsult(int memberNo);
	
	int updateCompanyNo(String companyNo, int memberNo);
	
	MemberDTO selectLoginMember(int memberNo);

	int modifyPw(MemberDTO member);

	int updateMember2(MemberDTO member);

	int deleteMember(MemberDTO member);

	int checkEmail(String checkEmail);

	String selectCompanyNo(int loginNo);

	String selectInsertCompanyNo(int memberNo);

}
