package kr.co.iei.admin.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import kr.co.iei.admin.model.dto.QuestionReDTO;
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
	
	@GetMapping(value = "/searchYearPayMember/{selectedYear}")
	public ResponseEntity<Map> searchYearPayMember(@PathVariable String selectedYear) {
		Map<String, Map<Integer, SalesDTO>> map = adminService.getSalesMember(selectedYear);
		return ResponseEntity.ok(map);
	}
	
	@GetMapping(value = "/searchYearPayCompany/{selectedYear}")
	public ResponseEntity<Map> searchYearPayCompany(@PathVariable String selectedYear) {
		Map<String, Map<Integer, SalesDTO>> map = adminService.getSalesCompany(selectedYear);
		return ResponseEntity.ok(map);
	}

	
	@GetMapping(value = "/getAdSales")
	public ResponseEntity<List> getAdSales() {
		List<Integer> list = adminService.getAdSales();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/getComapnyRank")
	public ResponseEntity<List> getComapnyRank() {
		List list = adminService.getCompanyRank();
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/getMemberNo/{memberNo}")
	public ResponseEntity<MemberDTO> getMemberNo(@PathVariable int memberNo) {
		MemberDTO member = adminService.getMemberNo(memberNo);
		return ResponseEntity.ok(member);
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

	@GetMapping(value = "/questionlist/{reqPage}")
	public ResponseEntity<Map> list(@PathVariable int reqPage) {
//    	System.out.println("reqPage : "+reqPage);
		Map map = adminService.selectQuestionList(reqPage);

		return ResponseEntity.ok(map);
	}

	@GetMapping(value = "/getOneQuestion/{questionNo}")
	public ResponseEntity<QuestionDTO> getOneQuestion(@PathVariable int questionNo) {
		QuestionDTO question = adminService.getOneQuestion(questionNo);
		return ResponseEntity.ok(question);
	}

	@GetMapping(value = "/file/{questioinFileNo}")
	public ResponseEntity<Resource> filedown(@PathVariable int questioinFileNo) throws FileNotFoundException {
		QuestionFileDTO questionFile = adminService.getQuestionFile(questioinFileNo);
		String savepath = root + "/question/";
		File file = new File(savepath + questionFile.getFilepath());

		Resource resource = new InputStreamResource(new FileInputStream(file));

		// 파일 다운로드를 위한 헤더 설정
		HttpHeaders header = new HttpHeaders();
		header.add("Cache-Control", "no-cache, no-store, must-revalidate");
		header.add("Pragma", "no-cache");
		header.add("Expires", "0");

		return ResponseEntity.status(HttpStatus.OK).headers(header).contentLength(file.length())
				.contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
	}
//	 .get(`${backServer}/admin/questionRe/${content}/${loginIdState}/${questionNo}`)

	@GetMapping(value = "/questionRe/{content}/{loginIdState}/{questionNo}")
	public ResponseEntity<Integer> questionRe(@PathVariable String content, @PathVariable String loginIdState,
			@PathVariable int questionNo) {
		System.out.println(content);
		System.out.println(loginIdState);
		System.out.println(questionNo);

		int result = adminService.questionRe(content, loginIdState, questionNo);
		return ResponseEntity.ok(result);
	}

	// .get(`${backServer}/admin/getQuestionRe/${questionNo}`)
	@GetMapping(value = "/getQuestionRe/{questionNo}")
	public ResponseEntity<QuestionReDTO> getQuestionRe(@PathVariable int questionNo) {
		QuestionReDTO result = adminService.getQuestionRe(questionNo);

		return ResponseEntity.ok(result);
	}

	// .get(`${backServer}/admin/myQsList/${}/${loginId}`)
	@GetMapping(value = "/myQsList/{reqPage}/{loginId}")
	public ResponseEntity<Map> myQsList(@PathVariable int reqPage, @PathVariable String loginId) {
		Map map = adminService.myQsList(reqPage, loginId);
		return ResponseEntity.ok(map);
	}
}
