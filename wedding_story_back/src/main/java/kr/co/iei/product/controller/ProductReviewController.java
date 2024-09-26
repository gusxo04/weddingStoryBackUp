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
import kr.co.iei.product.model.dto.ProductReviewDTO;
import kr.co.iei.product.model.service.ProductReviewService;
import kr.co.iei.util.FileUtils;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductReviewController {
	@Autowired
	private ProductReviewService productReviewService;
	
	@Autowired
	private FileUtils fileUtils;
	
	@Value("${file.root}")
	public String root;
	
	@GetMapping(value = "/memberNo/{memberNo}")
	public ResponseEntity<MemberDTO>selectMemberConsult(@PathVariable int memberNo){
		MemberDTO member = productReviewService.selectMemberConsult(memberNo);
		return ResponseEntity.ok(member);
	}
	
	@PostMapping
	public ResponseEntity<Integer> insertReview(@ModelAttribute ProductReviewDTO review, @ModelAttribute MemberDTO member){
		int result = productReviewService.insertReview(review,member);
		return ResponseEntity.ok(result);
	}
}
