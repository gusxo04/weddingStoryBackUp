package kr.co.iei.consult.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.consult.model.dao.ConsultDao;
import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dao.ProductDao;
import kr.co.iei.product.model.dto.ProductDTO;

@Service
public class ConsultService {
	
	@Autowired
	private ConsultDao consultDao;

	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Transactional
	public int insertConsult(ConsultDTO consult, MemberDTO member, ProductDTO product) {
		int result = consultDao.insertConsult(consult,member,product);
		return result;
	}

	public MemberDTO selectMemberConsult(int memberNo) {
		MemberDTO member = memberDao.selectMemberConsult(memberNo);
		return member;
	}

	public ProductDTO selectProductName(int productNo) {
		ProductDTO product = productDao.selectProductName(productNo);
		return null;
	}
}
