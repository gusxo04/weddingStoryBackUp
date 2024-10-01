package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.JwtUtils;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private BCryptPasswordEncoder encoder;
	@Autowired
	private JwtUtils jwtUtil;

	public int checkId(String checkId) {
		int result = memberDao.checkId(checkId);
		return result;
	}

	public int checkCode(String checkCode) {
		int result = memberDao.checkCode(checkCode);
		return result;
	}
	
	@Transactional
	public int insertMember(MemberDTO member) {
		int result = 0;
		String defaultPw = member.getMemberPw();
		String encPw = encoder.encode(defaultPw);
		member.setMemberPw(encPw);
		
		if(member.getMemberType() ==2) {
			if(member.getCompanyBusinessNo() != null) {
				String companyCode = memberDao.checkBusinessNo(member.getCompanyBusinessNo());
				if(companyCode !=null) {
					member.setCompanyNo(companyCode);
					result = memberDao.insertMember(member);
				}else {
					result = memberDao.insertMember(member);
				}
			}else {
				result = memberDao.insertMember(member);
			}
		}else if(member.getMemberType()==1) {
			if(member.getPartnerId()==null) {
				int lastMemberCode = memberDao.checkLastMemberCode();
				System.out.println(lastMemberCode);
				if(lastMemberCode<9) {
					String memberCode = "M000"+(lastMemberCode+1);
					member.setMemberCode(memberCode);
				}else if(lastMemberCode<99) {
					String memberCode = "M00"+(lastMemberCode+1);
					member.setMemberCode(memberCode);
				}else if(lastMemberCode<999) {
					String memberCode = "M0"+(lastMemberCode+1);
					member.setMemberCode(memberCode);
				}else if(lastMemberCode<9999) {
					String memberCode = "M"+(lastMemberCode+1);
					member.setMemberCode(memberCode);
				}
			}else if(member.getPartnerId()!=null) {
				String partnerCode = memberDao.checkPartnerCode(member.getPartnerId());
				member.setMemberCode(partnerCode);
				result = memberDao.insertMember(member);
				if(result>0) {
					result = memberDao.updateMember(member.getPartnerId(),member.getMemberName(),member.getMemberId());					
				}else {
					result = 0;
				}
			}
		}else {
			result = memberDao.insertMember(member);
		}
		return result;
	}

	public LoginMemberDTO loginMember(MemberDTO member) {
		MemberDTO m = memberDao.searchPw(member.getMemberId());
		 if(m != null && encoder.matches(member.getMemberPw(), m.getMemberPw())) {
			 String accessToken = jwtUtil.createAccessToken(m.getMemberNo() ,m.getMemberId(), m.getMemberType(), m.getMemberCode(), m.getCompanyNo());
			 String refreshToken = jwtUtil.createRefreshToken(m.getMemberNo() ,m.getMemberId(), m.getMemberType(), m.getMemberCode(), m.getCompanyNo());
			 LoginMemberDTO loginMember = new LoginMemberDTO(accessToken, refreshToken,m.getMemberNo(), m.getMemberId(), m.getMemberType(), m.getMemberCode(), m.getCompanyNo());
			 return loginMember;
		 }else {
			return null; 
		 }
	}

	public LoginMemberDTO refresh(String token) {
		try {
			LoginMemberDTO loginMember = jwtUtil.checkToken(token);
			String companyNo = memberDao.selectInsertCompanyNo(loginMember.getMemberNo()); 
			/* 업체등록을 누른시점에서 리프레쉬 토큰은 기존에 companyNo == null 인걸로 재생성하기에 companyNo가 발급 된 후 조회를 다시해서 리프레쉬 토큰 발행 */
			loginMember.setCompanyNo(companyNo);
			String accessToken = jwtUtil.createAccessToken(loginMember.getMemberNo(), loginMember.getMemberId(), loginMember.getMemberType(),loginMember.getMemberCode(), loginMember.getCompanyNo());
			String refreshToken = jwtUtil.createRefreshToken(loginMember.getMemberNo(),loginMember.getMemberId(), loginMember.getMemberType(),loginMember.getMemberCode(), loginMember.getCompanyNo());
			loginMember.setAccessToken(accessToken);
			loginMember.setRefreshToken(refreshToken);
			return loginMember;
		}catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	public MemberDTO selectLoginMember(int memberNo) {
		MemberDTO m = memberDao.selectLoginMember(memberNo);
		m.setMemberPw(null);
		return m;
	}

	public int checkOldPw(MemberDTO member) {
		MemberDTO m = memberDao.searchPw(member.getMemberId());
		if(m != null && encoder.matches(member.getMemberPw(), m.getMemberPw())) {
			return 1;
		}else {
			return 0;
		}
	}
	@Transactional
	public int modifyPw(MemberDTO member) {
		String defaultPw = member.getMemberPw();
		String encPw = encoder.encode(defaultPw);
		member.setMemberPw(encPw);
		int result = memberDao.modifyPw(member);
		return result;
	}
	@Transactional
	public int updateMember2(MemberDTO member) {
		int result = memberDao.updateMember2(member);
		return result;
	}
	@Transactional
	public int deleteMember(MemberDTO member) {
		int result = memberDao.deleteMember(member);
		return result;
	}

	public int checkEmail(String checkEmail) {
		int result = memberDao.checkEmail(checkEmail);
		return result;
	}
}
