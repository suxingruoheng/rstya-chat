package com.rstya.chat.exception;

/**
 * @Title SystemException
 * @Description 自定义系统异常类
 * @Create 2020-03-15 23:50
 * 
 * @Author suxingruoheng
 * 
 */
public class SystemException extends RuntimeException {

	private Integer code;

	public Integer getCode() {
		return this.code;
	}

	public SystemException(Exception e) {
		super(e);
	}

	public SystemException(String message) {
		super(message);
	}

	public SystemException(int code, String message) {
		super(message);
		this.code = code;
	}

	public SystemException(String message, Throwable e) {
		super(message, e);
	}

	/**
	 * 返回捕获异常的具体信息
	 *
	 * @param e
	 * @return
	 */
	public static String getExceptionInfo(Exception e) {
		StringBuilder out = new StringBuilder();
		out.append("\n").append(e).append("\r\n");
		StackTraceElement[] trace = e.getStackTrace();
		for (StackTraceElement s : trace) {
			out.append("\tat ").append(s).append("\r\n");
		}
		return out.toString();
	}
}
