package com.qfedu.ioc.test;

import com.qfedu.ioc.bean.Book;
import com.qfedu.ioc.bean.Student;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Date;
import java.util.Map;
import java.util.Set;

public class Test2 {

    public static void main(String[] args) {
        // 通过Spring容器创建Student对象
        //1.初始化Spring容器,加载Spring配置文件
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //2.通过Spring容器获取Student对象
        Student student2 = (Student) context.getBean("aaa");
        System.out.println(student2);


    }

}
