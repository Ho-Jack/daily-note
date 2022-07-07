package com.qfedu.dao;

import com.qfedu.pojo.Clazz;
import com.qfedu.utils.MyBatisUtil;
import org.junit.Test;

import static org.junit.Assert.*;

public class ClassDAOTest {

    @Test
    public void queryClassByCid() {

        ClassDAO classDAO = MyBatisUtil.getMapper(ClassDAO.class);
        Clazz clazz = classDAO.queryClassByCid(1);
        System.out.println(clazz.getClassName());

        System.out.println("-----------------------------------");

        System.out.println(clazz.getStus());
    }
}