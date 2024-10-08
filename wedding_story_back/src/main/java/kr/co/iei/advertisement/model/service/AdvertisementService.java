package kr.co.iei.advertisement.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.advertisement.model.dao.AdvertisementDao;
import kr.co.iei.advertisement.model.dto.AdvertisementDTO;
import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;

@Service
public class AdvertisementService {
	@Autowired
	private AdvertisementDao advertisementDao;
	@Autowired
	private CompanyDao companyDao;

	public Map getAdvertisement() {
		
		
		List<AdvertisementDTO> waitAd = advertisementDao.waitAd();//관리자 승인 전, 0
		for(AdvertisementDTO ads : waitAd) {
			CompanyDTO company = companyDao.selectContainCompany(ads.getCompanyNo());
			ads.setCompany(company);
		}
		List<AdvertisementDTO> yetAd = advertisementDao.yetAd();//결제완료, 1 (광고 start날짜 전, 아직)
		for(AdvertisementDTO ads : yetAd) {
			CompanyDTO company = companyDao.selectContainCompany(ads.getCompanyNo());
			ads.setCompany(company);
		}
		List<AdvertisementDTO> activeAd = advertisementDao.activeAd();//광고 중 2
		for(AdvertisementDTO ads : activeAd) {
			CompanyDTO company = companyDao.selectContainCompany(ads.getCompanyNo());
			ads.setCompany(company);
		}
		
		List<AdvertisementDTO> endAd = advertisementDao.endAd();//광고 종료 3
		for(AdvertisementDTO ads : endAd) {
			CompanyDTO company = companyDao.selectContainCompany(ads.getCompanyNo());
			ads.setCompany(company);
		}
		
		List<AdvertisementDTO> payAd = advertisementDao.payAd();//(관리자가 승인한 상태)결제 요청, 결제 전 4
		for(AdvertisementDTO ads : payAd) {
			CompanyDTO company = companyDao.selectContainCompany(ads.getCompanyNo());
			ads.setCompany(company);
		}
		
		
		
		//거절한 광고 state는 5, 따로 조회하지 않음
		
		
		
		Map<String, Object> map = new HashMap<String, Object>();
//		System.out.println("현재 광고 : "+activeAd);
		map.put("activeAd",activeAd);
		map.put("endAd",endAd);
		map.put("yetAd",yetAd);
		map.put("waitAd",waitAd);
		map.put("payAd", payAd);
		
		return map;
	}

	public int changeStartDate(String changeStartDate, int advertisementNo) {
		int result = advertisementDao.changeStartDate(changeStartDate, advertisementNo);
		return result;
	}

	public int changeEndDate(String changeEndDate, int advertisementNo) {
		int result = advertisementDao.changeEndDate(changeEndDate, advertisementNo);
		return result;
	}

	public int acceptAdvertisement(int advertisementNo) {
		int result = advertisementDao.acceptAdvertisement(advertisementNo);
		return 0;
	}

	
}
