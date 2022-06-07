package com.qfedu.dao;

import com.qfedu.pojo.Detail;
import com.qfedu.pojo.User;
import com.qfedu.utils.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import static org.junit.Assert.*;

public class UserDAOTest {

    @Test
    public void testInsertUser() {
        //用户注册，提交了基本信息和详情到Servlet，Servlet接收注册信息封装到User和Detail对象中
        User user = new User(0,"zhaoliu","111111","赵柳","03.jpg",null);
        Detail detail = new Detail(0,"湖北省宜昌市","13131313311","没个性不签名",0);

        SqlSession sqlSession = MyBatisUtil.getSqlSession();
        try {
            UserDAO userDAO = sqlSession.getMapper(UserDAO.class);
            int i = userDAO.insertUser(user);
            System.out.println(i);

            detail.setUserId(user.getUserId());

            DetailDAO detailDAO = sqlSession.getMapper(DetailDAO.class);
            int j = detailDAO.insertDetail(detail);
            System.out.println(j);

            sqlSession.commit();
        }catch (Exception e){
            e.printStackTrace();
            sqlSession.rollback();
        }
    }

    @Test
    public void testQueryUser(){
        UserDAO userDAO = MyBatisUtil.getMapper(UserDAO.class);
        User user = userDAO.queryUser("wangwu");
        System.out.println(user);
    }
}