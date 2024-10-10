package kr.co.iei.product.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import kr.co.iei.admin.model.dto.SalesDTO;
import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dao.ProductDao;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ProductFavoriteDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class ProductService {
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private CompanyDao companyDao;
	
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private PageUtil pageUtil;
	
	//올리스트
	public List getProductList(String state) {
		List<ProductDTO> list = productDao.getProductList(state);
		return list;
	}


	//웨딩홀리스트
	public Map getProducthallList(int reqPage) {
		String category = "웨딩홀";
		List list = productDao.getProductHallList(category);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		return map;
	}

	//웨딩홀상태페이지
	public Map productList(int productNo) {
		ProductDTO product = productDao.selectOneProduct(productNo);
		CompanyDTO company = companyDao.selectCompanyNo(product.getCompanyNo());	
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("product",product);
		map.put("company",company);
		return map;
	}

	//웨딩홀 예약하기에서 상품명 불러오기
	public ProductDTO selectProductOneList(int productNo) {
		ProductDTO product = productDao.selectProductOneList(productNo);
		return product;
	}


	public Map selectReservationInfo(int productNo, int memberNo) {
		MemberDTO member = memberDao.selectOneMember(memberNo);
		ProductDTO product = productDao.selectOneProduct(productNo);
		Map<String, Object> list = new HashMap<String, Object>();
		list.put("member", member);
		list.put("product",product);
		return list;
	}

	@Transactional
	public Integer insertWeddingHallPay(MemberDTO member, ProductDTO product, MemberPayDTO memberPay) {
		// 결제 관련 데이터 저장
        int result = memberDao.insertMemberPay(memberPay,member,product);   
		return result;
	}

	public List<ProductDTO> favoriteList(int memberNo) {
		List<ProductDTO> list = productDao.favoriteList(memberNo);
		return list;
	}
	
	public ProductFavoriteDTO favoriteOneList(ProductFavoriteDTO favorite) {
		ProductFavoriteDTO productFavorite = productDao.favoriteOneList(favorite);
		return productFavorite;
	}
	
	@Transactional
	public int favorite(int productNo, int memberNo, Boolean likeState) {
		int result = 0;
		if(likeState) {
			result = productDao.favoriteInsert(productNo,memberNo);
			System.out.println("insert");
		}else {
			result = productDao.favoritedelete(productNo,memberNo);
			System.out.println("델리트");
		}
		return result;
	}
	/*
	@Transactional
	public int favorite(ProductFavoriteDTO favorite) {
		int result = productDao.favoriteInsert(favorite);
//		빈하트 = 좋아요를 안 누른상태  if 클릭 -> 좋아요 누른거 -> DB에 insert 
//		꽉찬하트 = 좋아요를 누른 상태 if 클릭 -> 좋아요 취소 -> DB delete
//		좋아요를 눌렀는지 여부를 알 수 있는 방법은 select  데이터가 있으면 좋아요를 누른거 / 없으면 안 누른거
		return result;
		
		
	}
*/


	public List<ProductDTO> selectAdHall(String type) {
		List<ProductDTO> list = productDao.selectAdHall(type);
		return list;
	}
	
	public int favoriteState(int memberNo, int productNo) {
		System.out.println(memberNo);
		System.out.println(productNo);
		int count = productDao.favoriteState(memberNo,productNo);
		System.out.println("count"+count);
		if(count>0) {
			return 1;
		}else {
			return 0;
		}
	}
	
}
