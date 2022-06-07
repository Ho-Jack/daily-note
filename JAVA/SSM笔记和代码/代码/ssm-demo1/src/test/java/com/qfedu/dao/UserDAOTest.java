package com.qfedu.dao;

import com.qfedu.bean.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-context.xml","classpath:spring-mvc.xml","classpath:spring-mybatis.xml"})
public class UserDAOTest {

    @Resource
    private UserDAO userDAO;

    @Test
    public void queryUserByName() {
        User user = userDAO.queryUserByName("wangwu");
        System.out.println(user);
    }
}