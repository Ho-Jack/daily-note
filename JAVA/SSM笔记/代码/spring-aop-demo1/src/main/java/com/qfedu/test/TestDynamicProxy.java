package com.qfedu.test;

import com.qfedu.dao.*;
import com.qfedu.proxy.CGLibDynamicProxy;

public class TestDynamicProxy {

    public static void main(String[] args) {
        //创建被代理对象
        BookDAOImpl bookDAO = new BookDAOImpl();
        StudentDAOImpl studentDAO = new StudentDAOImpl();

        //创建动态代理类对象，并将被代理对象传递到代理类中赋值给obj
       // JDKDynamicProxy jdkDynamicProxy = new JDKDynamicProxy(studentDAO);
        //proxy就是产生的代理对象:产生的代理对象可以强转成被代理对象实现的接口类型
       // GenaralDAO proxy = (GenaralDAO)jdkDynamicProxy.getProxy();
        //使用代理对象调用方法，并不会执行调用的方法，而是进入到创建代理对象时指定的InvocationHandler类种的invoke方法
        //调用的方法作为一个Method参数，传递给了invoke方法
        //proxy.insert();


        //CGLibDynamicProxy cgLibDynamicProxy = new CGLibDynamicProxy(bookDAO);
        //BookDAOImpl proxy = (BookDAOImpl) cgLibDynamicProxy.getProxy();

        //proxy.update();
    }
}
