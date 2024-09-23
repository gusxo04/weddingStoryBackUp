package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@GetMapping(value="/checkId/{checkId}")
	public ResponseEntity<Integer> checkId(@PathVariable String checkId){
		int result = memberService.checkId(checkId);
		if(result>0) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.ok(0);
		}
		
	}
	@GetMapping(value="/checkCode/{checkCode}")
	public ResponseEntity<Integer> checkCode(@PathVariable String checkCode){
		int result = memberService.checkCode(checkCode);
		if(result>0) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.ok(0);
		}
	}
	@PostMapping(value = "/join")
	public ResponseEntity<Integer> insertMember(@ModelAttribute MemberDTO member){
		System.out.println(member);
		int result = memberService.insertMember(member);
		if(result>0) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.ok(0);
		}
	}
}
