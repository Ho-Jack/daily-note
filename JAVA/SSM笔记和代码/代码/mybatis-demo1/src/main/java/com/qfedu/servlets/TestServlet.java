package com.qfedu.servlets;

import com.qfedu.service.StudentService;
import com.qfedu.service.impl.StudentServiceImpl;

import java.io.IOException;

//web项目依赖jar： jsp  servlet-api

@javax.servlet.annotation.WebServlet("/TestServlet")
public class TestServlet extends javax.servlet.http.HttpServlet {

    private StudentService studentService = new StudentServiceImpl();

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }
}
