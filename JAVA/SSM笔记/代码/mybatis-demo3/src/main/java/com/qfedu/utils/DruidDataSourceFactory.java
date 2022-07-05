package com.qfedu.utils;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.datasource.pooled.PooledDataSourceFactory;


public class DruidDataSourceFactory extends PooledDataSourceFactory {

    public DruidDataSourceFactory() {
        System.out.println("druid-----init");
        this.dataSource = new DruidDataSource();
    }

}
