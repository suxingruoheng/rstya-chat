package com.rstya.chat.service;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Component;

/**
 * @Title MessageServer
 * @Description
 * @Create DateTime: 2020/7/14 23:08
 * 
 * @Author Zengya.Wang
 * 
 */
@Component
@ServerEndpoint(value = "/message/{id}")
public class MessageServer {

	private Session session;

	@OnOpen
	public void onOpen(Session session, @PathParam("id") String userId) throws IOException {
		this.session = session;
		this.session.getBasicRemote().sendText("你好" + userId + ", 你已经连接上了服务器");
		System.out.println("用户" + userId + "已连接");
	}

	@OnClose
	public void onClose(Session session) {
		System.out.println("客户端(" + session.getBasicRemote() + ")已断开连接");
		this.session = null;
	}

	@OnMessage
	public void onMessage(String message, @PathParam("id") String id) throws IOException {
		System.out.println("已收到用户" + id + "发来的信息：" + message);
		this.session.getBasicRemote().sendText("你好" + id + ", 我收到了你发来的消息: " + message);
	}

}
