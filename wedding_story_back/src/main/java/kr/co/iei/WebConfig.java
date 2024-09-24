package kr.co.iei;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Value("${file.root}")
    private String root;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {											// 박람회 사진은 convention 안에 있고 요청하려면 /convention/image/**로
        registry.addResourceHandler("/convention/image/**")
        .addResourceLocations("file:///"+root+"/convention/");
        
        registry.addResourceHandler("/editor/**")
        .addResourceLocations("file:///"+root+"/editor/");
        registry.addResourceHandler("/notice/thumb/**")
        .addResourceLocations("file:///"+root+"/notice/thumb/");
        															//  
        registry.addResourceHandler("/company/image/**")            
        .addResourceLocations("file:///"+root+"/company/thumb");
		
	}
	
	@Bean
	public BCryptPasswordEncoder bcrypt() {
		return new BCryptPasswordEncoder();
	}
	
	
	
	
}
