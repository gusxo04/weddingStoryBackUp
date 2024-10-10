package kr.co.iei.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ProductReviewDTO;
import kr.co.iei.product.model.service.ProductReviewService;
import kr.co.iei.util.FileUtils;

@RestController
@CrossOrigin("*")
@RequestMapping("/productComment")
public class ProductReviewController {
	@Autowired
	private ProductReviewService productReviewService;
	
	@Autowired
	private FileUtils fileUtils;
	
	@Value("${file.root}")
	public String root;
	//회원조회
	@GetMapping(value = "/memberNo/{memberNo}")
	public ResponseEntity<MemberDTO>selectMemberConsult(@PathVariable int memberNo){
		MemberDTO member = productReviewService.selectMemberConsult(memberNo);
		return ResponseEntity.ok(member);
	}
	
	//상품조회
	@GetMapping(value = "/productNo/{productNo}")
	public ResponseEntity<ProductDTO>selectProduct(@PathVariable int productNo){
		ProductDTO product = productReviewService.selectProduct(productNo);
		return ResponseEntity.ok(product);
	}
	
	//결제조회
	@GetMapping(value = "/payNo/{payNo}")
	public ResponseEntity<MemberPayDTO>selectMemberPay(@PathVariable int payNo){
		MemberPayDTO memberPay = productReviewService.selectMemberPay(payNo);
		//System.out.println(payNo);
		return ResponseEntity.ok(memberPay);
	}
	
	//리뷰인서트
	@PostMapping
	public ResponseEntity<Integer>insertReview(@ModelAttribute ProductReviewDTO productReview, @ModelAttribute MultipartFile image){
		//System.out.println(productReview);
		//System.out.println(image);
		int result = productReviewService.insertReview(productReview);
		return ResponseEntity.ok(result);
	}
	
	//리뷰삭제
	@DeleteMapping(value = "/productComment/{memberNo}")
	public ResponseEntity<Integer>deleteReview(@PathVariable ProductReviewDTO review){
		int result = productReviewService.deleteReview(review);
		return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "/{productNo}")
	public ResponseEntity<List> seelctProductReview(@PathVariable int productNo){
		List list = productReviewService.selectProductReview(productNo);
		//System.out.println("list : "+list);
		return ResponseEntity.ok(list);
	}
	
	
}
