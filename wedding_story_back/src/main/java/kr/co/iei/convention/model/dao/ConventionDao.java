package kr.co.iei.convention.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.company.model.dto.CompanyPayDTO;
import kr.co.iei.convention.model.dto.ConventionCommentDTO;
import kr.co.iei.convention.model.dto.ConventionCompanyDTO;
import kr.co.iei.convention.model.dto.ConventionDTO;
import kr.co.iei.convention.model.dto.ConventionMemberDTO;
import kr.co.iei.convention.model.dto.ConventionSeatDTO;
import kr.co.iei.convention.model.dto.RefundRequest;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;

@Mapper
public interface ConventionDao {

    ConventionDTO getTime();

    List selectConventionSeat();

    List selectConventionSeat(int i, int searchType);

    int insertConvention(ConventionDTO convention);

    int insertConventionMember(ConventionMemberDTO conventionMember);

    int insertMemberPay(MemberPayDTO memberPay);

    ConventionDTO selectOneConvention(int conventionNo);

    boolean updateConvention(ConventionDTO convention);

    MemberPayDTO selectPayment(int memberNo, int conventionNo);

    int updateMemberPay(RefundRequest request);

    int deleteConventionMember(RefundRequest request);

    int updateMemberPayKind(RefundRequest request);

    int insertConventionComment(ConventionCommentDTO conventionComment);

    List selectConventionCommentList(int conventionNo);

    List selectConventionReCommentList(int conventionNo);

    int deleteConventionComment(int conventionCommentNo);

    int updateConventionComment(ConventionCommentDTO conventionComment);

    public int insertConventionCompany(ConventionCompanyDTO conventionCompany);

    int insertCompanyPay(CompanyPayDTO companyPay);

    int updateSeatInfo(ConventionSeatDTO conventionSeat);

    MemberDTO selectMemberInfo(int memberNo);

    ConventionMemberDTO checkTicketDupelicate(ConventionMemberDTO conventionMember);

    CompanyPayDTO selectCompanyPayment(String companyNo, int conventionNo);

    int updateCompanyPay(RefundRequest request);

    int deleteConventionCompany(RefundRequest request);

    List selectAlarmTicket();

    int deleteCompanyPay(int conventionNo, String companyNo);

    int cancelConventionCompany(int conventionNo, String companyNo);

    ConventionCompanyDTO checkConventionCompany(ConventionSeatDTO conventionSeat);

    ConventionSeatDTO getConventionSeat(ConventionCompanyDTO conventionCompany);

    int updateConventionMemberTicket(RefundRequest request);
    
	ConventionDTO selectConventInfo(int ticketNo);

  void updateMemberPayProgress1(List updateList);

  List selectMemberPayProgress0();

  List<MemberPayDTO> selectMemberPayProgress1();

  void updateMemberPayProgress3(List<MemberPayDTO> updateList);

  int deleteConventionMemberPay(int conventionNo, int memberNo);

  ConventionMemberDTO checkConventionLimit(int conventionNo);

  ConventionDTO checkConventionDate(int conventionNo);

  ConventionDTO checkWritePermission();

}
