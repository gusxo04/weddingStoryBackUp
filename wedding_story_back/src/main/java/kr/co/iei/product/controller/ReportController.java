package kr.co.iei.product.controller;

import java.util.List;

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

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ReportDTO;
import kr.co.iei.product.model.service.ReportService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/report")
public class ReportController {
	@Autowired
	private ReportService reportService;
	//신고인서트
	@PostMapping
    public ResponseEntity<Integer> insertReport(@ModelAttribute ReportDTO report,@ModelAttribute CompanyDTO company, @ModelAttribute MemberDTO member) {
        int result = reportService.insertReport(report,company,member);
        //System.out.println(report);
        //System.out.println(company);
        //System.out.println(member);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{reportNo}")
    public ResponseEntity<ReportDTO> getReportId(@PathVariable int reportNo) {
        ReportDTO report = reportService.getReportId(reportNo);
        return ResponseEntity.ok(report);
    }
    //회원조회
    @GetMapping(value = "/{memberNo}")
    public ResponseEntity<MemberDTO> selectMemberNo(@PathVariable int memberNo){
    	MemberDTO member = reportService.selectMemberNo(memberNo);
    	System.out.println(member);
    	return ResponseEntity.ok(member);
    } 
    //업체조회
    @GetMapping(value = "/{companyNo}")
    public ResponseEntity<CompanyDTO>selectCompanyNo(@PathVariable int companyNo){
    	CompanyDTO company = reportService.selectCompanyNo(companyNo);
    	System.out.println(company);
    	return ResponseEntity.ok(company);
    }
    
    @PostMapping(value = "/{reportNo}")
    public ResponseEntity<Integer> deleteReport(@PathVariable int reportNo) {
        int result = reportService.deleteReport(reportNo);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping(value="/getReport/{currentCompanyNo}")
	public ResponseEntity<List<ReportDTO>> getReport(@PathVariable String currentCompanyNo){
		List<ReportDTO> report = reportService.getReport(currentCompanyNo);
		return ResponseEntity.ok(report);
	}
    
    //카운트
    @GetMapping(value = "/companyNo/{companyNo}")
    public ResponseEntity<Integer>selectCount(@PathVariable int companyNo){
    	int result = reportService.selectCount(companyNo);
    	return ResponseEntity.ok(result);
    }
    
}
