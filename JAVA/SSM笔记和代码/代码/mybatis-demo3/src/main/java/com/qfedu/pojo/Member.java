package com.qfedu.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member implements Serializable {
    private int memberId;
    private String memberNick;
    private String memberGender;
    private int memberAge;
    private String memberCity;
}
