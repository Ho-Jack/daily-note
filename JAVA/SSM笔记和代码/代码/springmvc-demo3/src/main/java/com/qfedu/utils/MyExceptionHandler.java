package com.qfedu.utils;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MyExceptionHandler {

    @ExceptionHandler(NullPointerException.class)
    public String nullHandler(){
        return "/err1.jsp";
    }

    @ExceptionHandler(NumberFormatException.class)
    public String formatHandler(){
        return "/err2.jsp";
    }

}
