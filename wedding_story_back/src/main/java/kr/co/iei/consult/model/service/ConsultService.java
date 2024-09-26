package kr.co.iei.consult.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.consult.model.dao.ConsultDao;
import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class ConsultService {
	
	@Autowired
	private ConsultDao consultDao;

	@Autowired
	private MemberDao memberDao;
	
	public int insertConsult(ConsultDTO consult, MemberDTO member) {
		int result = consultDao.insertConsult(consult,member);
		return result;
	}

	public MemberDTO selectMemberConsult(int memberNo) {
		MemberDTO member = memberDao.selectMemberConsult(memberNo);
		return member;
	}
}
