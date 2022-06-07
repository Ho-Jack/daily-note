package com.qfedu.test;

import com.qfedu.dao.BookDAOImpl;
import com.qfedu.proxy.MyStaticProxy;
import com.qfedu.dao.StudentDAOImpl;

public class Test {

    public static void main(String[] args) {

        //被代理对象
        BookDAOImpl bookDAO = new BookDAOImpl();
        StudentDAOImpl studentDAO = new StudentDAOImpl();

        //为被代理对象创建代理对象
        //MyStaticProxy proxy = new MyStaticProxy(bookDAO);

        //proxy.delete();
    }
}
