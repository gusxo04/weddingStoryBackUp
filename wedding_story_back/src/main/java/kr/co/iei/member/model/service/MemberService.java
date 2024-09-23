package kr.co.iei.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;

	public int checkId(String checkId) {
		int result = memberDao.checkId(checkId);
		return result;
	}

	public int insertMember(MemberDTO member) {
		// TODO Auto-generated method stub
		return 0;
	}

	public int checkCode(String checkCode) {
		int result = memberDao.checkCode(checkCode);
		return result;
	}

}
