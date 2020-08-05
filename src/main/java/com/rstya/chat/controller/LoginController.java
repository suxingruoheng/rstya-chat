package com.rstya.chat.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.rstya.chat.entity.UserLogin;
import com.rstya.common.constants.ResultCode;
import com.rstya.common.entity.Result;
import com.rstya.common.util.JSONUtils;

/**
 * @Title LoginController
 * @Description
 * @Create 2020-08-02 12:51
 * 
 * @Author suxingruoheng
 * 
 */
@RestController
public class LoginController extends CoreController {

	/**
	 * 用户登录
	 * 
	 * @param userLogin
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST)
	@ResponseBody
	public String login(UserLogin userLogin, HttpServletRequest request) {
		try {
			if (StringUtils.isBlank(userLogin.getAccount()) || StringUtils.isBlank(userLogin.getPassword())) {
				return JSONUtils.serialize(new Result(ResultCode.FAILURE, "参数错误"));
			}

		} catch (Exception e) {
			logger.error("登录失败" + getExceptionInfo(e));
		}
		return null;
	}
}
