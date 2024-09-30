package kr.co.iei.product.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dao.ProductReviewDao;
import kr.co.iei.product.model.dto.ProductReviewDTO;

@Service
public class ProductReviewService {
	
	@Autowired
	private ProductReviewDao productReviewDao;
	
	@Autowired
	private MemberDao memberDao;

	public MemberDTO selectMemberConsult(int memberNo) {
		MemberDTO member = memberDao.selectMemberConsult(memberNo);
		return member;
	}

	public int insertReview(ProductReviewDTO review, MemberDTO member) {
		int result = productReviewDao.insertReview(review,member);
		return result;
	}
	
}
