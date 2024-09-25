package kr.co.iei.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.util.FileUtils;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;

	@Autowired
	private FileUtils fileUtils;

	@Value("${file.root}")
	public String root;

	@GetMapping("/member/{reqPage}")
	public ResponseEntity<Map> getMemberList(@PathVariable int reqPage) {
		// Map<String, Object> memberList = new HashMap<>();

//        memberList.put("1", new TestMemberDTO(1, "user01", "홍길동", "010-1111-1111", "hong@example.com", "남", "001"));
//        memberList.put("2", new TestMemberDTO(2, "user02", "김철수", "010-1111-1111", "kim@example.com", "남", "002"));
//        memberList.put("3", new TestMemberDTO(3, "user03", "이영희", "010-1111-1111", "lee@example.com", "여", "003"));

		Map map = adminService.getMemberList(reqPage);
		return ResponseEntity.ok(map);
	}

	@GetMapping("/company/{reqPage}")
	public ResponseEntity<Map> getCompanyList(@PathVariable int reqPage) {
//		Map<String, Object> companyList = new HashMap<>();
//
//		companyList.put("1", new TestCompanyDTO("code", "업체1", "웨딩홀", "010-1111-1111", "mail@Mail.com", 1));
//		companyList.put("2", new TestCompanyDTO("code", "업체2", "드레스", "010-1111-1111", "mail@Mail.com", 1));
//		companyList.put("3", new TestCompanyDTO("code", "업체3", "촬영", "010-1111-1111", "mail@Mail.com", 1));
//		System.err.println("company 조회 시작, reqPage="+reqPage);                                                                                                                                                   
		Map map = adminService.getCompanyList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping("/partner/{myNo}/{myCode}")
	public ResponseEntity<MemberDTO> getPartner(@PathVariable int myNo, @PathVariable String myCode){
//		System.err.println("내 번호"+myNo+"내 코드"+myCode);
		MemberDTO partner = adminService.getPartner(myNo, myCode);
//		System.err.println("partner member : "+partner);
		return ResponseEntity.ok(partner);
	}
	
	@PostMapping("delete/{deleteMember}")
	public int delete(@PathVariable List<Integer> deleteMember) {
		System.err.println(deleteMember);
		int result=0;
		for(int memberNo : deleteMember) {
//			System.err.println(memberNo);
			int del = adminService.delete(memberNo);
			if(del>0) {
				System.err.println(memberNo+"삭제 성공");
				result++;
			}
		}
		return result;
	}
	
	@PostMapping("deleteCom/{deleteCompany}")
	public int deleteCom(@PathVariable List<String> deleteCompany) {
		System.err.println(deleteCompany);
		int result=0;
		for(String companyNo : deleteCompany) {
//			System.err.println(memberNo);
			int del = adminService.deleteCom(companyNo);
			if(del>0) {
				System.err.println(companyNo+"삭제 성공");
				result++;
			}
		}
		return result;
	}
}
