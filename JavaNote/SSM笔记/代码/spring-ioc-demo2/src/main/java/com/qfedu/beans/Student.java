package com.qfedu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import javax.annotation.Resource;

import java.util.Date;

@Component
@Scope(value = "singleton")
@Lazy(true)
public class Student {

    private String stuNum = "10001";
    private String stuName;
    private String stuGender;
    private int stuAge;
    private Date enterenceTime;

    @Resource
    private Clazz clazz;

    @PostConstruct
    public void init(){
        System.out.println("~~~~init");
    }

    @PreDestroy
    public void destory(){
        System.out.println("~~~~destory");
    }


    public Student() {
        System.out.println("----------创建");
    }

    @Override
    public String toString() {
        return "Student{" +
                "stuNum='" + stuNum + '\'' +
                ", stuName='" + stuName + '\'' +
                ", stuGender='" + stuGender + '\'' +
                ", stuAge=" + stuAge +
                ", enterenceTime=" + enterenceTime +
                ", clazz=" + clazz +
                '}';
    }

    public void setStuNum(String stuNum) {
        this.stuNum = stuNum;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    public void setStuGender(String stuGender) {
        this.stuGender = stuGender;
    }

    public void setStuAge(int stuAge) {
        this.stuAge = stuAge;
    }

    public void setEnterenceTime(Date enterenceTime) {
        this.enterenceTime = enterenceTime;
    }


    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }
}
