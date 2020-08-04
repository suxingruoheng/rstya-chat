package com.rstya.chat.service;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.rstya.chat.constants.RedisConstants;
import com.rstya.chat.pojo.SysUser;
import com.rstya.chat.util.RedisUtils;

/**
 * @Title CommonService
 * @Description
 * @Create 2020-08-02 13:19
 * 
 * @Author suxingruoheng
 * 
 */
@Service
public class CommonService {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 判断用户登录是否生效
	 *
	 * @param request
	 * @return true: 生效，false: 失效
	 */
	public boolean authorized(HttpServletRequest request) {
		String token = request.getHeader("token");
		if (StringUtils.isBlank(token)) {
			logger.info("权限校验不通过: token为空");
			return false;
		}

		String userInfo = RedisUtils.get(RedisConstants.USER_INFO + token);
		if (StringUtils.isBlank(userInfo)) {
			logger.info("权限校验不通过: redis中未查询到该token");
			return false;
		}

		SysUser sysUser = JSON.parseObject(userInfo, SysUser.class);
		if (null == sysUser) {
			logger.info("权限校验不通过: token对应用户信息为空");
			return false;
		}

		long expire = RedisUtils.expire(RedisConstants.USER_INFO + token, RedisConstants.SESSION_TIMEOUT);
		if (0 == expire) {
			logger.info("权限校验不通过: redis中登录信息超时了");
			return false;
		}

		logger.info("权限校验通过, 用户名: \"" + sysUser.getUsername() + "\", 账号: \"" + sysUser.getAccount() + "\"");
		return true;
	}

	/**
	 * 判断是否有权访问该资源
	 *
	 * @param request
	 * @return
	 */
	public boolean permissionAllowed(HttpServletRequest request) {
		// if (null == request) {
		// return false;
		// }
		//
		// String uri = request.getRequestURI();
		// // 不对公共接口做menu权限拦截
		// if (uri.startsWith("/common/") || uri.startsWith("/changePwd")) {
		// return true;
		// }
		//
		// String menuId = this.getClientRequestMenuId(request);
		// if (StringUtils.isBlank(menuId)) {
		// logger.error("异常访问：request.getHeader(\"REFERER\")中没有获取到menuId");
		// return false;
		// }
		//
		// String userMenus = RedisUtils.get(RedisConstants.USER_MENU + request.getHeader("token"));
		// if (StringUtils.isBlank(userMenus)) {
		// logger.error("该用户没有菜单权限");
		// return false;
		// }
		// List<SysMenu> menuList = JSONArray.parseArray(userMenus, SysMenu.class);
		// if (null == menuList || menuList.isEmpty()) {
		// logger.error("该用户没有菜单权限");
		// return false;
		// }
		//
		// for (SysMenu menu : menuList) {
		// if (menuId.equals(String.valueOf(menu.getId()))) {
		// return true;
		// }
		// }
		//
		// logger.error("异常访问：该用户没有该菜单权限");
		// return false;
		return true;
	}

	/**
	 * 获取请求发起页面的菜单ID参数
	 *
	 * @param request
	 * @return
	 */
	private String getClientRequestMenuId(HttpServletRequest request) {
		if (null == request) {
			return null;
		}

		// 从请求header中获取REFERER（该参数中是发起访问所在页面的地址，包含页面地址和menuId等信息）
		String referer = request.getHeader("REFERER");
		logger.info("访问来源页面：" + referer);
		if (StringUtils.isBlank(referer)) {
			return null;
		}

		// 获取参数拼接字符串（“?”号后面的部分）
		String paramStr = referer.substring(referer.indexOf("?") + 1);
		if (StringUtils.isBlank(paramStr)) {
			return null;
		}

		// 遍历参数，查询到menu所对应的key-value
		String[] params = paramStr.split("&");
		for (String param : params) {
			if (StringUtils.isNotBlank(param) && param.startsWith("menu")) {
				String[] kv = param.split("=");
				// 如果menu是数字，则是需要的结果
				return StringUtils.isNumeric(kv[1]) ? kv[1] : null;
			}
		}
		return null;
	}

}
