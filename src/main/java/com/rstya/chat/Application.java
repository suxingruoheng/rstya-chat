package com.rstya.chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * @Title Application
 * @Description
 * @Create DateTime: 2020/7/14 20:24
 * 
 * @Author Zengya.Wang
 * 
 */
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
