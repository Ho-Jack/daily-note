package com.qfedu.servlets;

import com.qfedu.beans.Book;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

@WebServlet("/BookServlet")
public class BookServlet extends BaseServlet {

    protected String add(Book book) throws ServletException, IOException {
        System.out.println("----------------book---add");
        System.out.println(book);
        return "tips.jsp";
    }


    protected void list(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("----------------book---list");
    }

    protected void delete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("----------------book---delete");
    }


    protected void search(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("----------------book---search");
    }

}
