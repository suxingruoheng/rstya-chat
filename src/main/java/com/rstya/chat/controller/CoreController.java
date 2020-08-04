package com.rstya.chat.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.rstya.chat.exception.SystemException;

/**
 * @Title CoreController
 * @Description
 * @Create DateTime: 2020/8/2 12:53
 * 
 * @Author Zengya.Wang
 * 
 */
public class CoreController {

	protected Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 判断验证是否通过
	 * 
	 * @return
	 */
	public boolean authorized() {
		return true;
	}

	/**
	 * 获取异常信息
	 * 
	 * @param e
	 * @return
	 */
	public String getExceptionInfo(Exception e) {
		return SystemException.getExceptionInfo(e);
	}
}
