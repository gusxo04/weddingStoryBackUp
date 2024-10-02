package kr.co.iei.advertisement.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdvertisementDao {

	List activeAd();

	List endAd();

	List yetAd();

	List waitAd();

	int changeStartDate(String changeStartDate, int advertisementNo);

	int changeEndDate(String changeEndDate, int advertisementNo);

	int acceptAdvertisement(int advertisementNo);

	int refuseAd(int adNo);


}
