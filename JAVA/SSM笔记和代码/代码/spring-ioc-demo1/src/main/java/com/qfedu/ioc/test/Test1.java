package com.qfedu.ioc.test;

import com.qfedu.ioc.bean.Student;
import com.qfedu.ioc.servlets.TestServlet;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Date;

public class Test1 {

    public static void main(String[] args) {

        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //2.通过Spring容器获取Student对象
        TestServlet testServlet = (TestServlet) context.getBean("testServlet");

        testServlet.doPost();
    }
}
