package kr.co.iei.convention.model.dao;



import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.convention.model.dto.ConventionCommentDTO;
import kr.co.iei.convention.model.dto.ConventionDTO;
import kr.co.iei.convention.model.dto.ConventionMemberDTO;
import kr.co.iei.convention.model.dto.RefundRequest;
import kr.co.iei.member.model.dto.MemberPayDTO;

@Mapper
public interface ConventionDao {

    ConventionDTO getTime();

    List selectConventionSeat();

    List selectConventionSeat(int i);

    boolean insertConvention(ConventionDTO convention);

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



}
