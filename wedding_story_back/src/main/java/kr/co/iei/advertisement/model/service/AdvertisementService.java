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
		List<AdvertisementDTO> activeAd = advertisementDao.activeAd();
		for(AdvertisementDTO ads : activeAd) {
			CompanyDTO company = companyDao.selectContainCompany(ads.getCompanyNo());
			ads.setCompany(company);
		}
		
		List<AdvertisementDTO> endAd = advertisementDao.endAd();
		for(AdvertisementDTO ads : endAd) {
			CompanyDTO company = companyDao.selectContainCompany(ads.getCompanyNo());
			ads.setCompany(company);
		}
		
		List<AdvertisementDTO> yetAd = advertisementDao.yetAd();
		for(AdvertisementDTO ads : yetAd) {
			CompanyDTO company = companyDao.selectContainCompany(ads.getCompanyNo());
			ads.setCompany(company);
		}
		List<AdvertisementDTO> waitAd = advertisementDao.waitAd();
		for(AdvertisementDTO ads : waitAd) {
			CompanyDTO company = companyDao.selectContainCompany(ads.getCompanyNo());
			ads.setCompany(company);
		}
		
		Map<String, Object> map = new HashMap<String, Object>();
//		System.out.println("현재 광고 : "+activeAd);
		map.put("activeAd",activeAd);
		map.put("endAd",endAd);
		map.put("yetAd",yetAd);
		map.put("waitAd",waitAd);
		
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
