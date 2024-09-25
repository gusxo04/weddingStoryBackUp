package kr.co.iei.consult.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.consult.model.dao.ConsultDao;
import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.member.model.dto.MemberDTO;

@Service
public class ConsultService {
	
	@Autowired
	private ConsultDao consultDao;

	public int insertConsult(ConsultDTO consult, MemberDTO member) {
		int result = consultDao.insertConsult(consult,member);
		return result;
	}
}
