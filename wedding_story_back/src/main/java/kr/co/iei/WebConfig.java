package kr.co.iei;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Value("${file.root}")
    private String root;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
																	// 박람회 사진은 convention 안에 있고 요청하려면 /convention/image/**로
        registry.addResourceHandler("/convention/image/**")
        .addResourceLocations("file:///"+root+"/convention/");
        
        															//  
        registry.addResourceHandler("/company/image/**")            
        .addResourceLocations("file:///"+root+"/company/thumb");
		
	}

	
	
	
	
}
