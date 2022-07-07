package com.qfedu.dao;

import com.qfedu.pojo.Student;
import com.qfedu.utils.MyBatisUtil;
import org.junit.Test;

import static org.junit.Assert.*;

public class StudentDAOTest {

    @Test
    public void testQueryStudentBySid() {

        StudentDAO studentDAO = MyBatisUtil.getMapper(StudentDAO.class);
        Student student = studentDAO.queryStudentBySid("10002");
        System.out.println(student);

    }
}