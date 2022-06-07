package com.qfedu.dao;

import com.qfedu.bean.User;

public interface UserDAO {

    public User queryUserByName(String name);

}
