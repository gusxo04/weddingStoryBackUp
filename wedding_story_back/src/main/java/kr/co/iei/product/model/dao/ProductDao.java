package kr.co.iei.product.model.dao;

import java.util.HashMap;	
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.admin.model.dto.SalesDTO;
import kr.co.iei.company.model.dto.CounselDTO;
import kr.co.iei.company.model.dto.CustomerDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.member.model.dto.MemberPayDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ProductFileDTO;
import kr.co.iei.util.PageInfo;

@Mapper
public interface ProductDao {

	int productTotalCount(String companyNo);
	
	int TotalCount();
	
	List getProductList(PageInfo pi);

	int insertProduct(ProductDTO product);

	int insertProductFile(ProductFileDTO list);

	ProductDTO selectOneProduct(int productNo);

	ProductDTO selectProductName(int productNo);

	List getProductHallList(PageInfo pi, String category);
	
	List selectProductList(String companyNo, PageInfo pi);

	ProductDTO selectProduct(int productNo);

	List selectProductFile(int productNo);

	ProductDTO productHallList(int productNo);

	int updateProductInfo(ProductDTO product);

	

	int deleteThumbnails(List<Object> delThumbsFile);

	List selectProductImg(int productNo);

	int deleteProduct(int productNo);

	int deleteProductFile(int productNo);

	List<Map<String, Object>> getYearlyMonthlySales(int selectedYear);

	SalesDTO getMontlySales(String month, String selectedYear);
	List selectProductNo(String companyNo);


	int TotalCustomerCount(List productNo);

	List<CustomerDTO> selectCustomerList(List productNo, PageInfo pi);

	int totalCounselCount(List productNo);

	List<CounselDTO> totalCounselList(PageInfo pi, List productNo);
	ProductDTO selectProductOneList(int productNo);

	void insertProductReservation(ProductDTO product);

	SalesDTO getCompanySales(int productNo);

	List<ProductDTO> selectProductList2(String companyNo);

	List<ProductDTO> favoriteList(int memberNo);

	int favoriteInsert(int productNo, int memberNo);

	int favoritedelete(int productNo, int memberNo);


}
