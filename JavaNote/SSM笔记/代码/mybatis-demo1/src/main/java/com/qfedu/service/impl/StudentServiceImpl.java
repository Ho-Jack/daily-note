package com.qfedu.service.impl;

import com.qfedu.dao.StudentDAO;
import com.qfedu.pojo.Student;
import com.qfedu.service.StudentService;
import com.qfedu.utils.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

public class StudentServiceImpl implements StudentService {

    private StudentDAO studentDAO = MyBatisUtil.getMapper(StudentDAO.class);

    public boolean addStudent(Student student) {
        boolean b = false;
//        SqlSession sqlSession = MyBatisUtil.getSqlSession();
        try{
            int i = studentDAO.insertStudent(student);
            b = i>0;
//            sqlSession.commit();
        }catch (Exception e){
//            sqlSession.rollback();
        }
        return b;
    }

    public List<Student> listStudents(){
        List<Student> list = studentDAO.listStudents();
        return list;
    }
}
