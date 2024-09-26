package kr.co.iei.advertisement.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.advertisement.model.dao.AdvertisementDao;

@Service
public class AdvertisementService {
	@Autowired
	private AdvertisementDao advertisementDao;

	public Map getAdvertisement() {
		// TODO Auto-generated method stub
		return null;
	} 
}
