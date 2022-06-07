package com.qfedu.dao;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.qfedu.pojo.Student;
import com.qfedu.utils.MyBatisUtil;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

import static org.junit.Assert.*;

public class StudentDAOTest {
    @Test
    public void insertStudent() {
        SqlSession sqlSession = MyBatisUtil.getSqlSession();
        //1.当我们获取sqlSession对象时，就默认开启了事务
        try {
            //通过会话获取DAO对象
            StudentDAO studentDAO = sqlSession.getMapper(StudentDAO.class);
            //测试StudentDAO中的方法
            Student student = new Student(0, "10007", "HanMeimei", "女", 21);
            int i = studentDAO.insertStudent(student);
            //操作1
            //操作2
            //操作3
            //2.操作完成并成功之后，需要手动提交
            System.out.println(student);
            sqlSession.commit();
        } catch (Exception e) {
            //3.当操作出现异常，调用rollback进行回滚
            sqlSession.rollback();
        }
    }

    @Test
    public void testDeleteStudent() {
        StudentDAO studentDAO = MyBatisUtil.getMapper(StudentDAO.class);
        int i = studentDAO.deleteStudent("10001");
    }


    @Test
    public void testUpdateStudent() {
        StudentDAO studentDAO = MyBatisUtil.getMapper(StudentDAO.class);
        int i = studentDAO.updateStudent(new Student(0, "10002", "赵柳", "女", 18));
        assertEquals(1, i);
    }

    @Test
    public void testListStudents() {
        StudentDAO studentDAO = MyBatisUtil.getMapper(StudentDAO.class);
        List<Student> list = studentDAO.listStudents();
        for (Student stu : list) {
            System.out.println(stu);
        }
    }

    @Test
    public void testQueryStudent() {
        StudentDAO studentDAO = MyBatisUtil.getMapper(StudentDAO.class);

        Student student = studentDAO.queryStudent("10001");
        System.out.println(student);
    }

    @Test
    public void testListStudentsByPage() {
        StudentDAO studentDAO = MyBatisUtil.getMapper(StudentDAO.class); //sqlSession
        PageHelper.startPage(2,4);
        //List<Student> students = studentDAO.listStudents();
        List<Student> list = studentDAO.listStudentsByGender("女");
        PageInfo<Student> pageInfo = new PageInfo<Student>(list);
        //pageInfo中就包含了数据及分页信息

    }


}

