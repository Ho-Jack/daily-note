package com.qfedu.beans;

import java.util.Date;

public class Book {

    private int bookId;
    private String bookName;
    private String bookAuthor;
    private double bookPrice;
    private Date publishTime;

    public Book() {
    }

    public Book(int bookId, String bookName, String bookAuthor, double bookPrice) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookPrice = bookPrice;
    }

    public Book(int bookId, String bookName, String bookAuthor, double bookPrice, Date publishTime) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookPrice = bookPrice;
        this.publishTime = publishTime;
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookId=" + bookId +
                ", bookName='" + bookName + '\'' +
                ", bookAuthor='" + bookAuthor + '\'' +
                ", bookPrice=" + bookPrice +
                ", publishTime=" + publishTime +
                '}';
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

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public double getBookPrice() {
        return bookPrice;
    }

    public void setBookPrice(double bookPrice) {
        this.bookPrice = bookPrice;
    }

    public Date getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(Date publishTime) {
        this.publishTime = publishTime;
    }
}
