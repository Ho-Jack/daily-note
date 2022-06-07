package com.qfedu.dao;

import com.qfedu.pojo.Course;
import com.qfedu.utils.MyBatisUtil;
import org.junit.Test;

import static org.junit.Assert.*;

public class CourseDAOTest {

    @Test
    public void testQueryCourseById() {
        CourseDAO courseDAO = MyBatisUtil.getMapper(CourseDAO.class);
        Course course = courseDAO.queryCourseById(1);
        System.out.println(course);
    }
}