package com.qfedu.dao;

import com.qfedu.pojo.User;

public interface UserDAO {

    public int insertUser(User user);

    //根据用户名查询用户信息
    public User queryUser(String username);

}
