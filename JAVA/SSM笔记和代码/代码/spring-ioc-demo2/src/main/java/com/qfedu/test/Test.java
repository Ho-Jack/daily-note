package com.qfedu.test;

import com.qfedu.beans.Student;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {

    public static void main(String[] args) {

        //1.初始化SPRING工厂
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");


        //2.通过Spring工厂获取Student对象
        Student stu1 = (Student) context.getBean("student");
        System.out.println(stu1);


    }
}
