package com.qfedu.dao;

import com.qfedu.pojo.User;

import java.util.List;


public interface UserDAO {

    public List<User> queryUsers();

    public int insertUser(User user);

}
