package kr.co.iei.product.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dao.ProductDao;
import kr.co.iei.product.model.dao.ProductReviewDao;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ProductReviewDTO;

@Service
public class ProductReviewService {
	
	@Autowired
	private ProductReviewDao productReviewDao;
	
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private ProductDao productDao;
	
	//회원조회
	public MemberDTO selectMemberConsult(int memberNo) {
		MemberDTO member = memberDao.selectMemberConsult(memberNo);
		return member;
	}
	//리뷰인서트
	@Transactional
	public int insertReview(ProductReviewDTO productReview) {	
		int result = productReviewDao.insertReview(productReview);
		return result;
	}
	//상품조회
	public ProductDTO selectProduct(int productNo) {
		ProductDTO product = productDao.selectProduct(productNo);
		return product;
	}
	//결제정보조회
	public MemberPayDTO selectMemberPay(int payNo) {
		MemberPayDTO memberPay = memberDao.selectMemberPay(payNo);
		return memberPay;
	}
	
	
}
