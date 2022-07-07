package com.qfedu.proxy;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * 1.添加cglib依赖
 * 2.创建一个类，实现MethodInterceptor接口，同时实现接口中的intercept方法
 * 3.在类中定义一个Object类型的变量，并提供这个变量的有参构造器，用于传递被代理对象
 * 4.定义getProxy方法创建并返回代理对象（代理对象是通过创建被代理类的子类来创建的）
 */
public class CGLibDynamicProxy implements MethodInterceptor {

    private Object obj;
    public CGLibDynamicProxy(Object obj) {
        this.obj = obj;
    }

    public Object getProxy(){
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(obj.getClass());
        enhancer.setCallback(this);
        Object proxy = enhancer.create();
        return proxy;
    }


    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        begin();
        Object returnValue = method.invoke(obj,objects);
        commit();
        return returnValue;
    }

    public void begin(){
        System.out.println("----------开启事务");
    }

    public void commit(){
        System.out.println("----------提交事务");
    }
}
