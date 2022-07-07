package com.qfedu.ioc.bean;

public class Book {

    private int bookId;
    private String bookName;

    public void init(){
        //初始化方法：在创建当前类对象时调用的方法，进行一些资源准备工作
        System.out.println("-------init");
    }

    public void destory(){
        //销毁方法：在Spring容器销毁对象时调用此方法，进行一些资源回收性的操作
        System.out.println("-------destory");
    }


    public Book() {
        System.out.println("~~~~~~~~~book");
    }


    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookId=" + bookId +
                ", bookName='" + bookName + '\'' +
                '}';
    }
}
