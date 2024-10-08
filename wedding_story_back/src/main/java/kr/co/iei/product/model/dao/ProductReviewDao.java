package kr.co.iei.product.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ProductReviewDTO;

@Mapper
public interface ProductReviewDao {
	//리뷰인서트
	int insertReview(ProductReviewDTO productReview, MemberDTO member, ProductDTO product, MemberPayDTO memberPay);


}
