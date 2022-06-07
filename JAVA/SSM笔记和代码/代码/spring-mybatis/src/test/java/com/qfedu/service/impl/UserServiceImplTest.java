package com.qfedu.service.impl;

import com.qfedu.pojo.User;
import com.qfedu.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.List;

//1.通过@RunWith 声明当前测试类位于Spring容器环境（被Spring容器管理）
@RunWith(SpringJUnit4ClassRunner.class)
//2.通过@ContextConfiguration 声明当前测试环境的Spring容器运行时加载的配置文件
@ContextConfiguration("classpath:applicationContext.xml")
public class UserServiceImplTest {

    //因为当前测试类是基于Spring容器运行的，当前测试类的对象是通过Spring容器创建的
    //因此可以通过Spring容器实现属性的注入
    @Resource
    private UserService userServiceImpl2;
    @Resource
    private UserService userServiceImpl;

    @Test
    public void test(){
        List<User> users = userServiceImpl.listUsers();
        System.out.println(users);
    }

}