package kr.co.iei.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
		return ResponseEntity.ok(memberPay);
	}
	
	//리뷰인서트
	@PostMapping
	public ResponseEntity<Integer>insertReview(@ModelAttribute ProductReviewDTO productReview,@ModelAttribute MemberDTO member, @ModelAttribute ProductDTO product, @ModelAttribute MemberPayDTO memberPay){
		int result = productReviewService.insertReview(productReview,member,product,memberPay);
		return ResponseEntity.ok(result);
	}
	
}
