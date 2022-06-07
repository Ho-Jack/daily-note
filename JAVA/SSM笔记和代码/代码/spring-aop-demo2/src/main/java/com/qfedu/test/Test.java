package com.qfedu.test;

import com.qfedu.dao.UserDAOImpl;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {

    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserDAOImpl userDAO = (UserDAOImpl) context.getBean("userDAOImpl");
        userDAO.insert();
    }
}
