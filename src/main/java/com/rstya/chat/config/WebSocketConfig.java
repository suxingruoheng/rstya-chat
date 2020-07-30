package com.rstya.chat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * @Title WebSocketConfig
 * @Description
 * @Create DateTime: 2020/7/29 19:40
 * 
 * @Author Zengya.Wang
 * 
 */
@Configuration
public class WebSocketConfig {

	@Bean
	public ServerEndpointExporter serverEndpointExporter() {
		return new ServerEndpointExporter();
	}
}
