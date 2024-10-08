package kr.co.iei.product.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.admin.model.dto.SalesDTO;
import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.member.model.dao.MemberDao;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dao.ProductDao;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.util.PageInfo;
import kr.co.iei.util.PageUtil;

@Service
public class ProductService {
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private CompanyDao componyDao;
	
	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private PageUtil pageUtil;
	
	//올리스트
	public Map getProductList(int reqPage) {
		int numPerPage = 5;
		int pageNaviSize = 4;
		int totalCount = productDao.TotalCount();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = productDao.getProductList(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}


	//웨딩홀리스트
	public Map getProducthallList(int reqPage) {
		String category = "웨딩홀";
		int numPerPage = 5;
		int pageNaviSize = 4;
		int totalCount = productDao.TotalCount();
		PageInfo pi = pageUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List list = productDao.getProductHallList(pi,category);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}

	//웨딩홀상태페이지
	public Map productList(int productNo) {
		ProductDTO product = productDao.selectOneProduct(productNo);
		CompanyDTO company = componyDao.selectCompanyNo(product.getCompanyNo());	
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


	
	
}
