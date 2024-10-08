package kr.co.iei.member.model.dao;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dto.ProductDTO;

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

//	String selectCompanyNo(int loginNo);

	String selectInsertCompanyNo(int memberNo);

	int insertAdmin(int selectedType, String insertId);
	List<ConsultDTO> consultList(int memberNo);

	CompanyDTO consultCompanyList(String companyNo);

	CompanyDTO conventionList(Date date);

	List<MemberPayDTO> paymentList(int memberNo, String state);

	int adminTotalCount2();

	List getAdminList(PageInfo pi);

	List<MemberPayDTO> getYear();


	MemberDTO getMember(String loginId);

	MemberDTO selectOneMember(int memberNo);

	int insertMemberPay(MemberPayDTO memberPay, MemberDTO member, ProductDTO product);

	MemberDTO getMemberNo(int memberNo);
	
	//리뷰결제번호조회
	MemberPayDTO selectMemberPay(int payNo);
	

}
