package com.qfedu.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qfedu.beans.Book;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("book")
public class BookController {

    /*接收请求行数据*/
    @RequestMapping("/add")
    public String addBook(String name, String author, double price,HttpServletRequest request){
        System.out.println("---book add");

        request.setAttribute("key1","value1");
        request.setAttribute("book",new Book(1,"Java","老张",2.22));
        return "tips";
    }

    @RequestMapping("/add2")
    public ModelAndView addBook2(String name, String author, double price){

        ModelAndView modelAndView = new ModelAndView("/tips.jsp");
        modelAndView.addObject("key2","value2");
        modelAndView.addObject("book",new Book(1,"C++","老张",2.22));
        return modelAndView;
    }





    @RequestMapping("/list")
    public void listBooks(@RequestHeader("token") String token){
        System.out.println("---book list");
    }

    @RequestMapping("/update")
    @ResponseBody
    public List<Book> update() {
        System.out.println("---book update");
        List<Book> books = new ArrayList<Book>();
        books.add(new Book(1,"Java","老张",2.22));
        books.add(new Book(2,"C++","老李",3.22));
        return books;
    }


}
