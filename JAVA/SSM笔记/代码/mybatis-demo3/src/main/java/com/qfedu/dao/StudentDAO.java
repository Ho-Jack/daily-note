package com.qfedu.dao;

import com.qfedu.pojo.Student;

import java.util.List;

public interface StudentDAO {

    //根据班级编号，查询这个班级下所有的学生
    public List<Student> queryStudentsByCid(int cid);

}
