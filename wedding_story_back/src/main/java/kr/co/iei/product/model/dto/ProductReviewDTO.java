package kr.co.iei.product.model.dto;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "productComment")
public class ProductReviewDTO {
	private int productCommentNo;	//리뷰번호
	private int productNo;	//상품번호
	private int payNo;		//구매번호
	private int memberNo;	//회원번호
	private int rating;		//별점
	private String review;	//리뷰내용(글쓰기)
	private String creationDate;	//작성일
}
