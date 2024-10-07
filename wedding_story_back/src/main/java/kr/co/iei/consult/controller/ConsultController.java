package kr.co.iei.consult.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.annotation.MultipartConfig;
import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.consult.model.service.ConsultService;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.product.model.dto.ProductDTO;


@RestController
@CrossOrigin("*")
@RequestMapping("/consult")
public class ConsultController {

	@Autowired
	private ConsultService consultService;
	
	@Autowired
	private MemberService memberService;
	
	//회원조회
	@GetMapping(value = "/memberNo/{memberNo}")
	public ResponseEntity<MemberDTO>selectMemberConsult(@PathVariable int memberNo){
		MemberDTO member = consultService.selectMemberConsult(memberNo);
		return ResponseEntity.ok(member);
	}
	
	//상품조회
	@GetMapping(value = "/productNo/{productNo}")
	public ResponseEntity<ProductDTO>selectProductName(@PathVariable int productNo){
		ProductDTO product = consultService.selectProductName(productNo);
		//System.out.println(product);
		return ResponseEntity.ok(product);
	}
	//상담하기
	@PostMapping
	 public ResponseEntity<Integer> insertConsult(@ModelAttribute ConsultDTO consult ,@ModelAttribute MemberDTO member, @ModelAttribute ProductDTO product) {
		System.out.println("consult : "+consult);
		System.out.println("member : "+member);
		System.out.println("product :"+product);
        int result = consultService.insertConsult(consult,member,product);
        return ResponseEntity.ok(result);
    }
	
	@GetMapping(value = "/consult")
	public ResponseEntity<ConsultDTO> selectConsult(@PathVariable int consultNo){
		ConsultDTO consult = consultService.selectConsult(consultNo);
		return ResponseEntity.ok(consult);
	}
	
	//세영이가 마이페이지 일정관리에서 상담 일정 삭제할때 사용함
	@DeleteMapping(value = "/deleteConsult/{consultNo}")
	public ResponseEntity<Integer> deleteConsult(@PathVariable int consultNo){
		int result = consultService.deleteConsult(consultNo);
		return ResponseEntity.ok(result);
	}
    
}
