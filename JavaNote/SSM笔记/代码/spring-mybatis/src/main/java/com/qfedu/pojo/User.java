package com.qfedu.pojo;


public class User {

    private int userId;
    private String userName;
    private String userPwd;
    private String realName;
    private String userImg;

    public User() {
    }

    public User(int userId, String userName, String userPwd, String realName, String userImg) {
        this.userId = userId;
        this.userName = userName;
        this.userPwd = userPwd;
        this.realName = realName;
        this.userImg = userImg;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", userPwd='" + userPwd + '\'' +
                ", realName='" + realName + '\'' +
                ", userImg='" + userImg + '\'' +
                '}';
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getUserImg() {
        return userImg;
    }

    public void setUserImg(String userImg) {
        this.userImg = userImg;
    }
}
