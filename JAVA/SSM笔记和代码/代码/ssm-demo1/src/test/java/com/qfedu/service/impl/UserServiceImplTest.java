package com.qfedu.service.impl;

import com.qfedu.bean.User;
import com.qfedu.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-context.xml","classpath:spring-mvc.xml","classpath:spring-mybatis.xml"})
public class UserServiceImplTest {

    @Resource
    private UserService userService;

    @Test
    public void testCheckLogin(){
        User user = userService.checkLogin("wangwu", "111111");
        assertNotNull(user);
    }

}