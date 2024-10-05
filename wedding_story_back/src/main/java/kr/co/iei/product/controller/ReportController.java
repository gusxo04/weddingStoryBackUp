package kr.co.iei.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.product.model.dto.ReportDTO;
import kr.co.iei.product.model.service.ReportService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/report")
public class ReportController {
	@Autowired
	private ReportService reportService;
	
	@PostMapping
    public ResponseEntity<Integer> insertReport(@RequestBody ReportDTO report) {
        int result = reportService.insertReport(report);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{reportNo}")
    public ResponseEntity<ReportDTO> getReportId(@PathVariable int reportNo) {
        ReportDTO report = reportService.getReportId(reportNo);
        return ResponseEntity.ok(report);
    }


    @PostMapping(value = "/{reportNo}")
    public ResponseEntity<Integer> deleteReport(@PathVariable int reportNo) {
        int result = reportService.deleteReport(reportNo);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping(value="/getReport/{currentCompanyNo}")
	public ResponseEntity<List<ReportDTO>> getReport(@PathVariable String currentCompanyNo){
		System.out.println("신고내역을 조회할 회사 코드"+currentCompanyNo);
		List<ReportDTO> report = reportService.getReport(currentCompanyNo);
		return ResponseEntity.ok(report);
	}
}
