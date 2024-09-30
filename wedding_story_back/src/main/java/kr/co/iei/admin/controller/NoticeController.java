package kr.co.iei.admin.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ch.qos.logback.core.testUtil.NPEAppender;
import kr.co.iei.admin.model.dto.NoticeDTO;
import kr.co.iei.admin.model.dto.NoticeFileDTO;
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
    	System.out.println("userstate"+userState);
    	Map map = noticeService.selectNoticeList(reqPage, userState);
    	
    	return ResponseEntity.ok(map);
    }
    
    @PostMapping(value = "/editorImage")
    public ResponseEntity<String> editorImage(@ModelAttribute MultipartFile image){
    	String savepath = root+"/editor/";
    	String filepath = fileUtils.upload(savepath, image);
    	return ResponseEntity.ok("/editor/"+filepath);
    }
    
    @PostMapping
    public ResponseEntity<Boolean> insertNotice(@ModelAttribute NoticeDTO notice, @ModelAttribute MultipartFile thumbnail,
			@ModelAttribute MultipartFile[] noticeFile){
    	System.out.println("insert 실행");
    	System.out.println(notice);
    	if(notice.getCompanyNo()==0) {
    		notice.setCompanyNo(null);
    		System.out.println("notice의 값이 0입니다");
    		System.out.println(notice);
    	}
    	
    	if (thumbnail != null) {
			String savepath = root + "/notice/thumb/";
			String filepath = fileUtils.upload(savepath, thumbnail);
			notice.setNoticeThumb(filepath);
		}
		List<NoticeFileDTO> noticeFileList = new ArrayList<NoticeFileDTO>();
		if (noticeFile != null) {
			String savepath = root + "/notice/";
			for (MultipartFile file : noticeFile) {
				NoticeFileDTO fileDTO = new NoticeFileDTO();
				String filename = file.getOriginalFilename();
				String filepath = fileUtils.upload(savepath, file);
				fileDTO.setFilename(filename);
				fileDTO.setFilepath(filepath);
				noticeFileList.add(fileDTO);
			}
		}
		int result = noticeService.insertNotice(notice, noticeFileList);
		return ResponseEntity.ok(result == 1 + noticeFileList.size());
    }
    
    @GetMapping(value = "/noticeNo/{noticeNo}")
    public ResponseEntity<NoticeDTO> selectOneNotice(@PathVariable int noticeNo){
    	NoticeDTO notice = noticeService.selectOneNotice(noticeNo);
    	return ResponseEntity.ok(notice);
    }
    
    @GetMapping(value = "/prenextnoticeNo/{noticeNo}")
    public ResponseEntity<Map> selectPreNextNotice(@PathVariable int noticeNo){
    	Map<String, NoticeDTO> map = noticeService.selectPreNextNotice(noticeNo);
    	return ResponseEntity.ok(map);
    }
}
