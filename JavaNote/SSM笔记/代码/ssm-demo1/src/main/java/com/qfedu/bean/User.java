package com.qfedu.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    private int userId;
    private String userName;
    private String userPwd;
    private String userRealname;
    private String userImg;

}
