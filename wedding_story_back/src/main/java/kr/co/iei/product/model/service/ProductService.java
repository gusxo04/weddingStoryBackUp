package kr.co.iei.product.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dto.SalesDTO;
import kr.co.iei.company.model.dao.CompanyDao;
import kr.co.iei.company.model.dto.CompanyDTO;
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
		System.out.println(list);
		System.out.println(pi);
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
	
	
}
