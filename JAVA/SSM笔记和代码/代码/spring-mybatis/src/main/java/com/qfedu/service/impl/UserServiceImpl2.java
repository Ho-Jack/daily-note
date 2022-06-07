package com.qfedu.service.impl;

import com.qfedu.dao.UserDAO;
import com.qfedu.pojo.User;
import com.qfedu.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl2 implements UserService {

    @Resource
    private UserDAO userDAO;

    @Transactional(isolation = Isolation.REPEATABLE_READ ,propagation = Propagation.SUPPORTS )
    public List<User> listUsers() {
        System.out.println(222);
        return userDAO.queryUsers();
    }

}
