package com.rstya.chat.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @Title SystemConfiguration
 * @Description 系统配置（拦截器配置等）
 * @Create 2020-03-07 15:01
 * 
 * @Author suxingruoheng
 * 
 */
@Configuration
public class SystemConfiguration implements WebMvcConfigurer {

	@Bean
	public SystemInterceptor systemInterceptor() {
		return new SystemInterceptor();
	}

	/**
	 * 添加拦截器
	 * 
	 * @param registry
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		InterceptorRegistration registration = registry.addInterceptor(this.systemInterceptor());

		List<String> patterns = new ArrayList<String>();
		patterns.add("/**");
		registration.addPathPatterns(patterns);

		List<String> excludePathPatterns = new ArrayList<String>();
		excludePathPatterns.add("/");
		excludePathPatterns.add("/message/**");
		excludePathPatterns.add("/static/**");
		excludePathPatterns.add("/favicon**");
		excludePathPatterns.add("/index.html");

		excludePathPatterns.add("/common/*");
		excludePathPatterns.add("/login");
		excludePathPatterns.add("/logout");
		registration.excludePathPatterns(excludePathPatterns);
	}
}
