package com.qfedu.controller;

import com.qfedu.beans.Book;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@Controller
@RequestMapping("/book")
public class BookController {


    @RequestMapping("/add")
    public String addBook(Book book, MultipartFile imgFile, HttpServletRequest request) throws IOException {
        System.out.println("--------------add");

        //imgFile就表示上传的图片
        //1.截取上传文件的后缀名,生成新的文件名
        String originalFilename = imgFile.getOriginalFilename();
        String ext = originalFilename.substring( originalFilename.lastIndexOf(".") ); // .jpg
        String fileName = System.currentTimeMillis()+ext;

        //2.获取imgs目录在服务器的路径
        String dir = request.getServletContext().getRealPath("imgs");
        String savePath = dir+"/"+fileName; //c:/asdfasdf/asdfasdf/asdf//asdf/img/3421341234.jpg

        //3.保存文件
        imgFile.transferTo( new File(savePath));

        //4.将图片的访问路径设置到book对象
        book.setBookImg("imgs/"+fileName);

        //5.调用service保存book到数据库
        return "/tips.jsp";
    }

    @RequestMapping("/list")
    @ResponseBody
    public String[] listImgs(HttpServletRequest request){
        //从imgs目录下获取所有的图片信息
        String dir = request.getServletContext().getRealPath("imgs");
        File imgDir = new File(dir);
        String[] fileNames = imgDir.list();
        return fileNames;
    }

    @RequestMapping("/download")
    public void downloadImg(String fname, HttpServletRequest request, HttpServletResponse response) throws Exception {
        //从imgs目录找到当前文件
        String dir = request.getServletContext().getRealPath("imgs");
        String filePath = dir+"/"+fname;
        FileInputStream fileInputStream = new FileInputStream(filePath);

        response.setContentType("application/exe");
        response.addHeader("Content-Disposition","attachment;filename="+fname);

        IOUtils.copy(fileInputStream, response.getOutputStream());
    }


    @RequestMapping("/query")
    public String query(String bookId){
        System.out.println(bookId.length());
        int  bid = Integer.parseInt(bookId);
        return "/tips.jsp";
    }


}
