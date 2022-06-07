package com.qfedu.proxy;

public class MyStaticProxy {


    private GenaralDAO genaralDAO;
    public MyStaticProxy(GenaralDAO genaralDAO) {
        this.genaralDAO = genaralDAO;
    }


    public void insert(){
        begin();
        genaralDAO.insert();
        commit();
    }
    public void delete(){
        begin();
        genaralDAO.delete();
        commit();
    }
    public void update(){
        begin();
        genaralDAO.update();
        commit();
    }

    public void begin(){
        System.out.println("---开启事务");
    }

    public void commit(){
        System.out.println("---提交事务");
    }
}
