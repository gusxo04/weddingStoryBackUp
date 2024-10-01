package kr.co.iei.member.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.consult.model.dto.ConsultDTO;
import kr.co.iei.member.model.dto.LoginMemberDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.service.MemberService;
import kr.co.iei.util.EmailSender;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private EmailSender emailSender;
	
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
	@GetMapping(value="/checkEmail/{checkEmail}")
	public ResponseEntity<String> checkEmail(@PathVariable String checkEmail){
		int result = memberService.checkEmail(checkEmail);
		if(result >0) {
			return ResponseEntity.ok("중복");
		}else{			
			String emailTitle = "[인증번호 발송] 웨딩스토리 인증메일입니다.";
			Random r = new Random();
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<6;i++) {
				int flog = r.nextInt(3);
				if(flog ==0) {
					int randomCode = r.nextInt(10);
					sb.append(randomCode);
				}else if(flog ==1) {
					char randomCode = (char)(r.nextInt(26)+65);
					sb.append(randomCode);
				}else if(flog ==2) {
					char randomCode = (char)(r.nextInt(26)+97);
					sb.append(randomCode);
				}
			}
			String emailContent = "<h2>안녕하세요. Wedding Story입니다.</h2>"
					+"<h3>인증번호는 [ <span style='color:red;'>"+sb.toString()+"</span> ] 입니다.</h3>";
			emailSender.sendMail(emailTitle,checkEmail,emailContent);
			return ResponseEntity.ok(sb.toString());
		}
	}
	@PostMapping(value = "/join")
	public ResponseEntity<Integer> insertMember(@RequestBody MemberDTO member){
		int result = memberService.insertMember(member);
		if(result>0) {
			return ResponseEntity.ok(result);
		}else {
			return ResponseEntity.ok(0);
		}
	}
	@PostMapping(value="/login")
	public ResponseEntity<LoginMemberDTO> loginMember(@RequestBody MemberDTO member){
		 LoginMemberDTO loginMember = memberService.loginMember(member);
		if(loginMember != null) {
			return ResponseEntity.ok(loginMember);
		}else{			
			return ResponseEntity.status(404).build();
		}
	}
	
	@PostMapping(value="/refresh")
	public ResponseEntity<LoginMemberDTO> refresh(@RequestHeader("Authorization") String token){
		LoginMemberDTO loginMember = memberService.refresh(token);
		if(loginMember != null) {
			return ResponseEntity.ok(loginMember);
		}else{			
			return ResponseEntity.status(404).build();
		}
	}
	@GetMapping(value="/selectLoginMember/{memberNo}")
	public ResponseEntity<MemberDTO> selectLoginMember(@PathVariable int memberNo){
		MemberDTO m  = new MemberDTO();
		if(memberNo != 0) {
			m = memberService.selectLoginMember(memberNo);	
			return ResponseEntity.ok(m);
		}
		return ResponseEntity.ok(null);
	}
	@PostMapping(value="/checkOldPw")
	public ResponseEntity<Integer> checkOldPw(@RequestBody MemberDTO member){
		int result = memberService.checkOldPw(member);
		return ResponseEntity.ok(result);
	}
	@PatchMapping(value="/modifyPw")
	public ResponseEntity<Integer> modifyPw(@RequestBody MemberDTO member){
		int result = memberService.modifyPw(member);
		return ResponseEntity.ok(result);
	}
	@PatchMapping(value="/updateMember")
	public ResponseEntity<Integer> updateMember(@RequestBody MemberDTO member){
		int result = memberService.updateMember2(member);
		return ResponseEntity.ok(result);
	}
	@PatchMapping(value="/deleteMember")
	public ResponseEntity<Integer> deleteMember(@RequestBody MemberDTO member){
		int result = memberService.deleteMember(member);
		return ResponseEntity.ok(result);
	}
	@GetMapping(value="/consultList/{memberNo}")
	public ResponseEntity<List<ConsultDTO>> consultList(@PathVariable int memberNo){
		System.out.println(memberNo);
		List<ConsultDTO> list = memberService.consultList(memberNo);
		return ResponseEntity.ok(list);
	}
}
