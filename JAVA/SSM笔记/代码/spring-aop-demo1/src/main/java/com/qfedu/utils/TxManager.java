package com.qfedu.utils;

public class TxManager {

    public void begin(){
        System.out.println("-----------开启事务");
    }

    public void commit(){
        System.out.println("-----------提交事务");
    }

}
