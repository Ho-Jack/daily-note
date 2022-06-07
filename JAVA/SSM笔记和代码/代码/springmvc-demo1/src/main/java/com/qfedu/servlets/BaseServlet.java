package com.qfedu.servlets;

import com.qfedu.beans.Book;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

@WebServlet("/BaseServlet")
public class BaseServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String methodStr = request.getParameter("method");  // BookServlet?method=add&bookName=Java&bookAuthor=zhangsan

            // this 表示HTTP请求的Servlet类的对象    BookServlet类的对象
            // c 表示HTTP请求的Servlet类              BookServlet类
            Class c = this.getClass();

            Method method = c.getDeclaredMethod(methodStr, Book.class);  // 获取到add方法

            //将request中的数据取出来，存放到Book对象，传递到add方法
            Class<?>[] types = method.getParameterTypes();   //获取到add方法的参数类型  Book
            Class type = types[0];          //type   Book类
            Object o = type.newInstance();  // o就表示一个book对象

            BeanUtils.populate(o,request.getParameterMap());

            String url = (String)method.invoke(this,o);      //调用add方法
            if(url.indexOf(":")>=0){
                 String[] arr = url.split(":");
                 String t = arr[0];  //"redirect";
                 String path = arr[1];
                 if("redirect".equals(t)){
                     response.sendRedirect(path);
                 }else if("forward".equals(t)){
                     request.getRequestDispatcher(url).forward(request,response);
                 }
            }else{
                request.getRequestDispatcher(url).forward(request,response);
            }



        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
