package com.qfedu.dao;

import com.qfedu.pojo.Clazz;
import com.qfedu.utils.MyBatisUtil;
import org.junit.Test;

import static org.junit.Assert.*;

public class ClassDAOTest {

    @Test
    public void testQueryClass() {

        ClassDAO classDAO = MyBatisUtil.getMapper(ClassDAO.class);
        Clazz clazz = classDAO.queryClass(1);
        System.out.println(clazz);
    }
}