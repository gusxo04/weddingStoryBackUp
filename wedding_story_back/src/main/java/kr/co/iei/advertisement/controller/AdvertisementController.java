package kr.co.iei.advertisement.controller;

import java.sql.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public ResponseEntity<Map> getAdvertisement() {
//		System.out.println("광고목록조회를 시작합니다");

		Map map = advertisementService.getAdvertisement();
		return ResponseEntity.ok(map);
	}

	@GetMapping("/changeStartDate/{changeStartDate}/{advertisementNo}")
	public ResponseEntity<Integer> changeStartDate(@PathVariable String changeStartDate,
			@PathVariable int advertisementNo) {
//		System.out.println("시작날짜변경 시작");
//		System.out.println(changeStartDate);
//		System.out.println(advertisementNo);
//		
		int result = advertisementService.changeStartDate(changeStartDate, advertisementNo);

		return ResponseEntity.ok(result);
	}

	@GetMapping("/changeEndDate/{changeEndDate}/{advertisementNo}")
	public ResponseEntity<Integer> changeEndDate(@PathVariable String changeEndDate,
			@PathVariable int advertisementNo) {
//		System.out.println("종료날짜변경 시작");
		System.out.println(changeEndDate);
		System.out.println(advertisementNo);

		int result = advertisementService.changeEndDate(changeEndDate, advertisementNo);

		return ResponseEntity.ok(result);
	}

	@GetMapping("/acceptAdvertisement/{advertisementNo}")
	public ResponseEntity<Integer> acceptAdvertisement(@PathVariable int advertisementNo) {
//		System.out.println("광고수락");
//		System.out.println(advertisementNo);

		int result = 0;

		int totalResult = advertisementService.totalInprogressCount(advertisementNo);
		// 이게 5개 넘으면 result -1

		if (totalResult >= 5) {
			System.out.println("진행중인 광고가 이미 5개 이상입니다");
			return ResponseEntity.ok(totalResult);
		} else {
			result = advertisementService.acceptAdvertisement(advertisementNo);
			return ResponseEntity.ok(result);
		}
	}

	@GetMapping("/acceptAdvertisementDo/{advertisementNo}")
	public ResponseEntity<Integer> acceptAdvertisementDo(@PathVariable int advertisementNo) {

		int result = advertisementService.acceptAdvertisement(advertisementNo);
		return ResponseEntity.ok(result);

	}
}
