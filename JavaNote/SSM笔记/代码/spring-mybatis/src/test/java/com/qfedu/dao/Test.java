package com.qfedu.dao;

import com.qfedu.pojo.User;
import com.qfedu.service.impl.UserServiceImpl;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;


public class Test {

   @org.junit.Test
    public void test() {
       ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
       //如果想要通过Spring容器在UserServiceImpl对象中注入UserDAO对象，必须通过Spring容器创建获取UserServiceImpl对象
       UserServiceImpl userService = (UserServiceImpl) context.getBean("userServiceImpl");
       List<User> users = userService.listUsers();
   }

   @org.junit.Test
   public void test2(){
       ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

       UserDAO userDAO = (UserDAO) context.getBean("userDAO");
       User user = new User(0,"Hanmeimei","111111","韩梅梅","03.jpg");
       int i = userDAO.insertUser(user);
       System.out.println(i);
   }
}