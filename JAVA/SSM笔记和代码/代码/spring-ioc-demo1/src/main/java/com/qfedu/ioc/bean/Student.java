package com.qfedu.ioc.bean;

import java.util.*;

public class Student {

    private String stuNum;
    private String stuName;
    private String stuGender;
    private int stuAge;
    private double weight;
    private Date enterenceTime; //入学日期

    private Clazz clazz;

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }



    public Student() {
    }

    public Student(String stuNum, String stuName, String stuGender, int stuAge, double weight, Date enterenceTime, Clazz clazz) {
        this.stuNum = stuNum;
        this.stuName = stuName;
        this.stuGender = stuGender;
        this.stuAge = stuAge;
        this.weight = weight;
        this.enterenceTime = enterenceTime;
        this.clazz = clazz;
    }

    private List<String> hobbies;
    private Set<String> sets;
    private Map<String,Object> maps;
    private Properties properties;

    public Student(List<String> hobbies, Set<String> sets, Map<String, Object> maps, Properties properties) {
        this.hobbies = hobbies;
        this.sets = sets;
        this.maps = maps;
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "Student{" +
                "stuNum='" + stuNum + '\'' +
                ", stuName='" + stuName + '\'' +
                ", stuGender='" + stuGender + '\'' +
                ", stuAge=" + stuAge +
                ", weight=" + weight +
                ", enterenceTime=" + enterenceTime +
                ", clazz=" + clazz +
                '}';
    }
}
