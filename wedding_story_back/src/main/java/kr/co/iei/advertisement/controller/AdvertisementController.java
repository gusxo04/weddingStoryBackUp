package kr.co.iei.advertisement.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.advertisement.model.service.AdvertisementService;

@RestController
@CrossOrigin("*")
@RequestMapping("/advertisement")
public class AdvertisementController {
	@Autowired
	private AdvertisementService advertisementService;
	
	@GetMapping("/advertisement")
	public ResponseEntity<Map> getAdvertisement(){
		System.out.println("광고목록조회를 시작합니다");
		
		Map map = advertisementService.getAdvertisement();
		return ResponseEntity.ok(map);
	}
}
