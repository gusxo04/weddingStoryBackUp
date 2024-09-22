package kr.co.iei.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.admin.model.service.NoticeService;
import kr.co.iei.util.FileUtils;

@RestController
@CrossOrigin("*")
@RequestMapping("/notice")
public class NoticeController {
	@Autowired
    private NoticeService noticeService;

    @Autowired
    private FileUtils fileUtils;

    @Value("${file.root}")
    public String root;
    
    @GetMapping(value = "/list/{reqPage}/{userState}")
    public ResponseEntity<Map> list (@PathVariable int reqPage, @PathVariable int userState){
//    	System.out.println("reqPage : "+reqPage);
//    	System.out.println("userState"+userState);
    	Map map = noticeService.selectNoticeList(reqPage, userState);
    	return ResponseEntity.ok(map);
    }
}
