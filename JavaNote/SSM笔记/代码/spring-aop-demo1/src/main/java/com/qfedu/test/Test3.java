package com.qfedu.test;

import com.qfedu.dao.BookDAOImpl;
import com.qfedu.dao.StudentDAOImpl;
import com.qfedu.service.BookServiceImpl;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class Test3 {

    public static void main(String[] args) {

        //通过Spring容器获取BookDAOImpl的对象，并调用方法
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookDAOImpl bookDAO = (BookDAOImpl) context.getBean("bookDAO");
        StudentDAOImpl studentDAO = (StudentDAOImpl) context.getBean("studentDAO");
        //bookDAO.delete();
        //studentDAO.delete(12);


        //如果要使用Spring aop面向切面编程，调用切入点方法的对象必须通过Spring容器获取
        //如果一个类中的方法被声明为切入点并且织入了切点之后，通过Spring容器获取该类对象，实则获取到的是一个代理对象
        //如果一个类中的方法没有被声明为切入点，通过Spring容器获取的就是这个类真实创建的对象
        //BookServiceImpl bookService = new BookServiceImpl();
        BookServiceImpl bookService = (BookServiceImpl) context.getBean("bookServiceImpl");
        //bookService.addBook();

        bookDAO.insert();

    }

}
