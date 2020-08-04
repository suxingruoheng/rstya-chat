package com.rstya.chat.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.rstya.chat.pojo.SysUser;
import com.rstya.chat.pojo.SysUserExample;

public interface SysUserMapper {
	long countByExample(SysUserExample example);

	int deleteByExample(SysUserExample example);

	int deleteByPrimaryKey(Long id);

	int insert(SysUser record);

	int insertSelective(SysUser record);

	List<SysUser> selectByExample(SysUserExample example);

	SysUser selectByPrimaryKey(Long id);

	int updateByExampleSelective(@Param("record") SysUser record, @Param("example") SysUserExample example);

	int updateByExample(@Param("record") SysUser record, @Param("example") SysUserExample example);

	int updateByPrimaryKeySelective(SysUser record);

	int updateByPrimaryKey(SysUser record);
}