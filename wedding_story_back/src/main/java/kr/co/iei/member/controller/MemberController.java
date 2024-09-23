package kr.co.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.member.model.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@GetMapping(value="/checkId/{checkId}")
	public ResponseEntity<Integer> checkId(@PathVariable String checkId){
		System.out.println(checkId);
		int result = memberService.checkId(checkId);
		if(result>0) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.ok(0);
		}
		
	}
}
