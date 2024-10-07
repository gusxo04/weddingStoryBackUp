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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.dto.NoticeDTO;
import kr.co.iei.admin.model.dto.NoticeFileDTO;
import kr.co.iei.admin.model.dto.QuestionDTO;
import kr.co.iei.admin.model.dto.QuestionFileDTO;
import kr.co.iei.admin.model.dto.SalesDTO;
import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dto.ReportDTO;
import kr.co.iei.product.model.service.ProductService;
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

		Map map = adminService.getMemberList(reqPage);
		return ResponseEntity.ok(map);
	}

	@GetMapping("/adminMember/{reqPage}")
	public ResponseEntity<Map> getAdminMemberList(@PathVariable int reqPage) {
		Map map = adminService.getAdminMemberList(reqPage);
		return ResponseEntity.ok(map);
	}

	@GetMapping("/company/{reqPage}")
	public ResponseEntity<Map> getCompanyList(@PathVariable int reqPage) {
		Map map = adminService.getCompanyList(reqPage);
		return ResponseEntity.ok(map);
	}

	@GetMapping("/partner/{myNo}/{myCode}")
	public ResponseEntity<MemberDTO> getPartner(@PathVariable int myNo, @PathVariable String myCode) {
		MemberDTO partner = adminService.getPartner(myNo, myCode);
		return ResponseEntity.ok(partner);
	}

	@PostMapping("delete/{deleteMember}")
	public int delete(@PathVariable List<Integer> deleteMember) {
		System.err.println(deleteMember);
		int result = 0;
		for (int memberNo : deleteMember) {
			int del = adminService.delete(memberNo);
			if (del > 0) {
				System.err.println(memberNo + "삭제 성공");
				result++;
			}
		}
		return result;
	}

	@PostMapping("deleteCom/{currentCompanyNo}")
	public int deleteCom(@PathVariable String currentCompanyNo) {
		System.err.println(currentCompanyNo);
		int result = adminService.deleteCom(currentCompanyNo);
		return result;
	}

	@GetMapping(value = "/refuse/{loginId}/{companyNo}/{refuse}/{adNo}")
	public ResponseEntity<Integer> refuseAd(@PathVariable String loginId, @PathVariable String companyNo,
			@PathVariable String refuse, @PathVariable int adNo) {
		int result = adminService.refuseAd(loginId, companyNo, refuse, adNo);
		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "/updateAdmin/{insertId}/{selectedType}")
	public ResponseEntity<Integer> insertAdmin(@PathVariable String insertId, @PathVariable int selectedType) {
		System.out.println("관리자 등록");
		System.out.println("insertId:" + insertId + ", selectedType :" + selectedType);
		int result = adminService.insertAdmin(selectedType, insertId);
		return ResponseEntity.ok(result);
	}

	@GetMapping(value = "/getYear")
	public ResponseEntity<Map> getYear() {
		Map map = adminService.getYear();
		return ResponseEntity.ok(map);
	}

	@GetMapping(value = "/searchYearPay/{selectedYear}")
	public ResponseEntity<Map> searchYearPay(@PathVariable String selectedYear) {
		Map<String, Map<Integer, SalesDTO>> map = adminService.getSales(selectedYear);
		return ResponseEntity.ok(map);
	}

	@GetMapping(value = "/getComapnyRank")
	public ResponseEntity<List> getComapnyRank() {
		List list = adminService.getComapnyRank();
		return ResponseEntity.ok(list);
	}

	@PostMapping(value = "/inputRequest")
	public ResponseEntity<Boolean> inputRequest(@ModelAttribute QuestionDTO question, String loginId,
			MultipartFile[] questionFile) {
		System.err.println(question);
		System.err.println(loginId);
		MemberDTO member = adminService.getMember(loginId);
		List<QuestionFileDTO> questionFileList = new ArrayList<QuestionFileDTO>();
		if (questionFile != null) {
			String savepath = root + "/question/";
	        for (MultipartFile file : questionFile) {
	            QuestionFileDTO fileDTO = new QuestionFileDTO();
	            String filename = file.getOriginalFilename();
				String filepath = fileUtils.upload(savepath, file);
				fileDTO.setFilename(filename);
				fileDTO.setFilepath(filepath);
				questionFileList.add(fileDTO);
	        }
	    } 
		int result = adminService.insertQuestion(question, questionFileList, member);
		return ResponseEntity.ok(result == 1 + questionFileList.size());
	}

}
