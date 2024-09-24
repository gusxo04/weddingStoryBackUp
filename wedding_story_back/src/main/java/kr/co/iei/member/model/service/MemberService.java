package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private BCryptPasswordEncoder encoder;

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
		System.out.println(member);
		
		if(member.getMemberType() ==2) {
			if(member.getCompanyNo()==null) {
				int lastCompanyNo = memberDao.checkLastCompanyNo();
				if(lastCompanyNo<9) {
					String companyNo = "C000"+(lastCompanyNo+1);
					member.setCompanyNo(companyNo);
				}else if(lastCompanyNo<99) {
					String companyNo = "C00"+(lastCompanyNo+1);
					member.setMemberCode(companyNo);
				}else if(lastCompanyNo<999) {
					String companyNo = "C0"+(lastCompanyNo+1);
					member.setMemberCode(companyNo);
				}else if(lastCompanyNo<9999) {
					String companyNo = "C"+(lastCompanyNo+1);
					member.setMemberCode(companyNo);
				}
				result = memberDao.insertMember(member);
			}else if(member.getCompanyNo()!=null) {
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
				result = memberDao.insertMember(member);
			}else if(member.getPartnerId()!=null) {
				String partnerCode = memberDao.checkPartnerCode(member.getPartnerId());
				System.out.println(partnerCode);
				member.setMemberCode(partnerCode);
				result = memberDao.insertMember(member);
			}
		}else {
			result = memberDao.insertMember(member);
		}
		return result;
	}

}
