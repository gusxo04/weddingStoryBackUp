package kr.co.iei.company.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	public ResponseEntity<Boolean> insertCompany(@ModelAttribute CompanyDTO company,@ModelAttribute KeyWordDTO keyWord, @ModelAttribute MultipartFile thumbFile ,@ModelAttribute MemberDTO member){
		//썸네일 파일은 String으로 받을수 없음 -> MultipartFile로 thumbFile라는 객체로 받은 후 
		//아래 로직을 통해서 savepath 로 실제 저장장소경로를 등록해주고  fileUtil을 통해서 savepath(저장경로)에thumbFile(실제 파일)을 업로드 해주고 저장된 경로를 filepath리턴받는다.
		//리턴받은 값을 company.CompanyThumb에 set 해준다. 
		
		if(thumbFile != null) {
			String savepath = root+"/company/thumb/";					//경로 등록
			String filepath = fileUtil.upload(savepath, thumbFile); //경로에 저장
			company.setCompanyThumb(filepath); 						//company에 추가
		}
		int result = companyService.insertCompany(company,keyWord,member);
		return ResponseEntity.ok(result == 3);
	}
	
	
	//업체 정보 조회
	@GetMapping(value="/{companyNo}")
	public ResponseEntity<CompanyDTO> selectCompanyInfo(@PathVariable String companyNo){
		CompanyDTO resultCompany = companyService.selectCompanyInfo(companyNo);
		return ResponseEntity.ok(resultCompany); 
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
	

	
}
