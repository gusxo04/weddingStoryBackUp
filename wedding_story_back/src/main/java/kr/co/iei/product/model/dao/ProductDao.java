package kr.co.iei.product.model.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ProductFileDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface ProductDao {

	int TotalCount();

	List getProductList(PageInfo pi);

	int insertProduct(ProductDTO product);

	int insertProductFile(ProductFileDTO list);

	ProductDTO selectOneProduct(int productNo);

	List selectProductList(String companyNo, PageInfo pi);

	ProductDTO selectProduct(int productNo);

	List selectProductFile(int productNo);
	
	



}
