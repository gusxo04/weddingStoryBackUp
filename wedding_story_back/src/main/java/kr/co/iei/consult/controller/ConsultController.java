package kr.co.iei.consult.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.consult.model.service.ConsultService;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;

@RestController
@CrossOrigin("*")
@RequestMapping("/consult")
public class ConsultController {

	@Autowired
	private ConsultService consultService;
	
	@Autowired
	private MemberService memberService;

	
	@PostMapping
	 public ResponseEntity<Integer> insertConsult(@ModelAttribute ConsultDTO consult, @ModelAttribute MemberDTO member) {
        int result = consultService.insertConsult(consult,member);
        System.out.println(consult);
        System.out.println(member);
        return ResponseEntity.ok(result);
    }
    
}
