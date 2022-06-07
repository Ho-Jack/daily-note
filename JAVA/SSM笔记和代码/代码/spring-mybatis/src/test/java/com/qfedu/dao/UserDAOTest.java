package com.qfedu.dao;

import com.qfedu.pojo.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class UserDAOTest {

    @Autowired
    private UserDAO userDAO;

    @Test
    public void testQueryUsers(){
        List<User> users = userDAO.queryUsers();
        System.out.println(users);
    }

}