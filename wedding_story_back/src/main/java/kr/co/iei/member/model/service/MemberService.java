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
		
		if(member.getMemberType() ==2) {
			result = memberDao.insertMember(member);
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

	public MemberDTO selectMember(int memberNo) {
		// TODO Auto-generated method stub
		return null;
	}

}
