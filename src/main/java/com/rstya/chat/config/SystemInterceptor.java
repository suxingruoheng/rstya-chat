package com.rstya.chat.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.rstya.chat.controller.CoreController;
import com.rstya.chat.service.CommonService;

/**
 * @Title SystemInterceptor
 * @Description 拦截器配置
 * @Create 2020-03-07 14:59
 *
 * @Author suxingruoheng
 * 
 */
public class SystemInterceptor extends CoreController implements HandlerInterceptor {

	@Autowired
	private CommonService commonService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		// 验证登录是否有效
		if (!commonService.authorized(request)) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			request.getRequestDispatcher("/common/error").forward(request, response);
			return false;
		}

		// 验证是否有权限
		if (!commonService.permissionAllowed(request)) {
			response.setStatus(HttpStatus.FORBIDDEN.value());
			request.getRequestDispatcher("/common/error").forward(request, response);
			return false;
		}

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

	}
}
