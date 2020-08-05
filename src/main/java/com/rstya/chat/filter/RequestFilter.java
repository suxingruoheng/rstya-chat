package com.rstya.chat.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.rstya.common.util.IPUtils;

/**
 * @Title RequestFilter
 * @Description
 * @Create 2020-03-15 23:53
 * 
 * @Author suxingruoheng
 * 
 */
@Component
@WebFilter
public class RequestFilter implements Filter {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;

		logger.info("用户[token: " + request.getHeader("token") + "] 正在访问接口: [" + request.getMethod() + "] " + request.getRequestURL());
		logger.info("来源IP地址: " + IPUtils.getClientIP(request) + ", 来源页面: " + request.getHeader("REFERER"));
		logger.info("Content-Type: " + request.getContentType());
		logger.info("请求参数: " + JSON.toJSONString(request.getParameterMap()));

		filterChain.doFilter(request, response);
	}

	@Override
	public void destroy() {

	}
}
