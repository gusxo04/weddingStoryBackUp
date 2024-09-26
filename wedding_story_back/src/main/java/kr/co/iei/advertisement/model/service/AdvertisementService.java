package kr.co.iei.advertisement.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.advertisement.model.dao.AdvertisementDao;

@Service
public class AdvertisementService {
	@Autowired
	private AdvertisementDao advertisementDao;

	public Map getAdvertisement() {
		List activeAd = advertisementDao.activeAd();
		List endAd = advertisementDao.endAd();
		List yetAd = advertisementDao.yetAd();
		List waitAd = advertisementDao.waitAd();
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("activeAd",activeAd);
		map.put("endAd",endAd);
		map.put("yetAd",yetAd);
		map.put("waitAd",waitAd);
		
		return map;
	} 
}
