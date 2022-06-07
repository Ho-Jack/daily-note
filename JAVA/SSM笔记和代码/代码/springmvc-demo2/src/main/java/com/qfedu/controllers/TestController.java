package com.qfedu.controllers;

import com.qfedu.beans.Book;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;

@Controller
@RequestMapping("/test")
public class TestController {

    @RequestMapping("/add")
    //表单提交的多个数据，在控制器方法中可以使用对象接收
    //但是提交的数据的key必须要与对象的属性名一致
    public String addBook(Book book){
        return "/tips.jsp";
    }


}
