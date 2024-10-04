package kr.co.iei.company.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.company.model.dto.CompanyDTO;
import kr.co.iei.company.model.dto.KeyWordDTO;
import kr.co.iei.company.model.service.CompanyService;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.product.model.dto.ProductDTO;
import kr.co.iei.product.model.dto.ProductFileDTO;
import kr.co.iei.util.FileUtils;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/company")
public class CompanyController {
	@Autowired
	private CompanyService companyService;
	
	@Autowired
	private FileUtils fileUtil;
	
	@Value("${file.root}")
	public String root;
	
	
	//업체 정보 등록
	@PostMapping(value="/join")
	public ResponseEntity<String> insertCompany(@ModelAttribute CompanyDTO company,@ModelAttribute KeyWordDTO keyWord, @ModelAttribute MultipartFile thumbFile ,@ModelAttribute MemberDTO member){
		//썸네일 파일은 String으로 받을수 없음 -> MultipartFile로 thumbFile라는 객체로 받은 후 
		//아래 로직을 통해서 savepath 로 실제 저장장소경로를 등록해주고  fileUtil을 통해서 savepath(저장경로)에thumbFile(실제 파일)을 업로드 해주고 저장된 경로를 filepath리턴받는다.
		//리턴받은 값을 company.CompanyThumb에 set 해준다. 
		if(thumbFile != null) {
			String savepath = root+"/company/thumb/";					//경로 등록
			String filepath = fileUtil.upload(savepath, thumbFile); //경로에 저장
			company.setCompanyThumb(filepath); 						//company에 추가
		}
		String result = companyService.insertCompany(company,keyWord,member);
		return ResponseEntity.ok(result);
	}
	
	
	//업체 정보 조회
	@GetMapping(value="/{companyNo}")
	public ResponseEntity<CompanyDTO> selectCompanyInfo(@PathVariable String companyNo){
		CompanyDTO resultCompany = companyService.selectCompanyInfo(companyNo);
		return ResponseEntity.ok(resultCompany); 
	}
	
	//업체 정보 업데이트 (수정)
	@PatchMapping
	public ResponseEntity<Boolean> updateCompanyInfo(@ModelAttribute CompanyDTO company,@ModelAttribute KeyWordDTO keyWord, @ ModelAttribute MultipartFile thumbFile){
		if(thumbFile != null) {
			String savepath = root+"/product/image/";
			String filepath = fileUtil.upload(savepath, thumbFile);
			company.setCompanyThumb(filepath);
		}
		int result = companyService.updateCompanyInfo(company,keyWord);
		
		return ResponseEntity.ok(result == 2);
	}
	
	//업체 상품 등록
	@PostMapping(value="/product")
	public ResponseEntity<Boolean> insertProduct(@ModelAttribute ProductDTO product, @ModelAttribute MultipartFile thumbFile ,@ModelAttribute MultipartFile[] thumbnailFiles){
		if(thumbFile != null) {
			String savepath = root+"/product/image/";					//경로 등록
			String filepath = fileUtil.upload(savepath, thumbFile); //경로에 저장
			product.setProductImg(filepath); 						//company에 추가
		}
		List<ProductFileDTO> productFile = new ArrayList<ProductFileDTO>();
		if(thumbnailFiles != null) {
			String savepath = root+"/product/thumb/";
			for(MultipartFile files : thumbnailFiles) {
				ProductFileDTO fileDTO = new ProductFileDTO();
					String filename = files.getOriginalFilename();
					String filepath = fileUtil.upload(savepath, files);
					fileDTO.setFileName(filename);
					fileDTO.setFilePath(filepath);
					productFile.add(fileDTO);
			}
		}
		int result = companyService.insertProduct(product, productFile);
		return ResponseEntity.ok(result == 1+productFile.size());
	}
	
	
	//
//	@GetMapping(value="/select/{loginNo}")
//	public ResponseEntity<String> selectCompanyNo(@PathVariable int loginNo){
//		String result = companyService.selectCompanyNo(loginNo);
//		
//		return ResponseEntity.ok(result);
//	}
	
	//상품페이지 이동시 카테고리 조회 
	@GetMapping(value="/category/{companyNo}")
	public ResponseEntity<String> selectCategory(@PathVariable String companyNo){
		String result = companyService.selectCategory(companyNo);
		
		return ResponseEntity.ok(result);
	}

	//ToastEditor 사용시 이미지 업로드 
	@PostMapping(value="/editorImage")
	public ResponseEntity<String> editorImage(@ModelAttribute MultipartFile image){
		String savepath = root+"/product/editor/"; //파일경로 지정 
		String filepath = fileUtil.upload(savepath, image); //파일 실제경로에 업로드 
		return ResponseEntity.ok("/product/editor/"+filepath); // 미리보기를 위해 경로값 리턴
	}
	
	//상품 페이지 리스트 생성
	@GetMapping(value="/list/{companyNo}/{reqPage}")
	public ResponseEntity<Map> list(@PathVariable String companyNo,@PathVariable int reqPage){
		Map map = companyService.productList(reqPage,companyNo);
		
		return ResponseEntity.ok(map);
	}
	
	//상품번호로 상품 DTO 조회
	@GetMapping(value="/product/{productNo}")
	public ResponseEntity<Map> selectOneProduct(@PathVariable int productNo){
		Map product = companyService.selectOneProduct(productNo);
		return ResponseEntity.ok(product);
	}
	
	//상품 정보 수정
	@PatchMapping(value="/product")
	public ResponseEntity<Boolean> updateProductInfo(@ModelAttribute ProductDTO product, @ModelAttribute MultipartFile thumbFile,@ModelAttribute MultipartFile[] thumbnailFiles ,@RequestParam List<Object> delThumbsFile){
	
		if(thumbFile != null) {
			String savepath = root+"/product/image/";					//경로 등록
			String filepath = fileUtil.upload(savepath, thumbFile); //경로에 저장
			product.setProductImg(filepath); 						//company에 추가
		}
		List<ProductFileDTO> productFile = new ArrayList<ProductFileDTO>();
		if(thumbnailFiles != null) {
			String savepath = root+"/product/thumb/";
			for(MultipartFile files : thumbnailFiles) {
				ProductFileDTO fileDTO = new ProductFileDTO();
					String filename = files.getOriginalFilename();
					String filepath = fileUtil.upload(savepath, files);
					fileDTO.setFileName(filename);
					fileDTO.setFilePath(filepath);
					fileDTO.setProductNo(product.getProductNo());
					productFile.add(fileDTO);
					System.out.println("1 :"+productFile);
			}
		}
		//front에서 보내준것은 filepath이므로 조회를 하지않고 바로 삭제
		int result  = companyService.updateProductInfo(product,productFile,delThumbsFile);
		if(delThumbsFile != null) {
			String savepath = root+"/product/thumb/";
			for(Object delete : delThumbsFile) {
				File delFile = new File(savepath + delete);
				delFile.delete();
			}
			return ResponseEntity.ok(true);
		}else {
			return ResponseEntity.ok(false);
		}
	}
	@DeleteMapping(value = "/product/{productNo}")
	public ResponseEntity<Boolean> deleteProduct(@PathVariable int productNo) {
			System.out.println(productNo);
		Map deleteFile = companyService.deleteProduct(productNo);
		System.out.println("controller : "+ deleteFile);
		if(deleteFile != null) {
			String imgSavepath = root+"/product/image";
			Object Img = deleteFile.get("img");
			File delFile = new File(imgSavepath + Img);
			delFile.delete();
			String thumbsSavepath = root+"product/thumb/";
			Object thumbs = deleteFile.get("thumbs");
			System.out.println(thumbs);
			
		}
		
		return ResponseEntity.ok(null);
				
	}
}
