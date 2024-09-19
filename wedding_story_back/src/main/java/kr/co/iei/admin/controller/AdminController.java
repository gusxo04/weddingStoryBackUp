package kr.co.iei.admin.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.admin.model.dto.TestMemberDTO;
import kr.co.iei.admin.model.service.AdminService;
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
    
    @GetMapping("/member")
    public Map<String, Object> getMemberList() {
        Map<String, Object> memberList = new HashMap<>();

        
        memberList.put("1", new TestMemberDTO(1, "user01", "홍길동", "010-1111-1111", "hong@example.com", "남", "001"));
        memberList.put("2", new TestMemberDTO(2, "user02", "김철수", "010-1111-1111", "kim@example.com", "남", "002"));
        memberList.put("3", new TestMemberDTO(3, "user03", "이영희", "010-1111-1111", "lee@example.com", "여", "003"));
        
        return memberList;
    }
}
