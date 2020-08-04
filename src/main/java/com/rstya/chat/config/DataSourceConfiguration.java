package com.rstya.chat.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.alibaba.druid.pool.DruidDataSource;

/**
 * @Title DataSourceConfiguration
 * @Description 数据源配置
 * @Create 2019-03-26 11:44
 * 
 * @Author suxingruoheng
 * 
 */
@Configuration
@MapperScan(basePackages = DataSourceConfiguration.MAPPER_PACKAGE, sqlSessionFactoryRef = "appSqlSessionFactory")
public class DataSourceConfiguration {

	// 扫描 Mapper下各子目录的映射文件
	public static final String MAPPER_PACKAGE = "com.rstya.chat.mapper";
	public static final String MAPPER_LOCATION = "classpath:com/rstya/chat/mapper/*.xml";

	@Value("${spring.datasource.url}")
	private String url;

	@Value("${spring.datasource.username}")
	private String username;

	@Value("${spring.datasource.password}")
	private String password;

	@Value("${spring.datasource.driver-class-name}")
	private String driverClass;

	@Bean(name = "appDataSource")
	@Primary
	public DataSource appDataSource() {
		DruidDataSource ds = new DruidDataSource();
		ds.setDriverClassName(driverClass);
		ds.setUrl(url);
		ds.setUsername(username);
		ds.setPassword(password);
		return ds;
	}

	@Bean(name = "appTransactionManager")
	@Primary
	public DataSourceTransactionManager appTransactionManager() {
		return new DataSourceTransactionManager(appDataSource());
	}

	@Bean(name = "appSqlSessionFactory")
	@Primary
	public SqlSessionFactory appSqlSessionFactory(@Qualifier("appDataSource") DataSource dataSource) throws Exception {
		final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource);
		Resource[] resources = new PathMatchingResourcePatternResolver().getResources(DataSourceConfiguration.MAPPER_LOCATION);
		sessionFactory.setMapperLocations(resources);
		return sessionFactory.getObject();
	}

}
