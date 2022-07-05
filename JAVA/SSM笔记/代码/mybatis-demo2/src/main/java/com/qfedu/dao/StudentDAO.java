package com.qfedu.dao;

import com.qfedu.pojo.Student;

import java.util.List;

public interface StudentDAO {

    //public List<Student> listStudentsByCid(int cid);

    public Student queryStudentBySid(String sid);


    public List<Student> queryStudentsByCourseId(int courseId);
}
