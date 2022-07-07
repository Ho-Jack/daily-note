package com.qfedu.service;

import com.qfedu.bean.User;

public interface UserService {

    public User checkLogin(String userName,String userPwd);

}
