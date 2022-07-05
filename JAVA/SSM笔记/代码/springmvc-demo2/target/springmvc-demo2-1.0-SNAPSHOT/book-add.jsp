<%--
  Created by IntelliJ IDEA.
  User: THEO
  Date: 2021/3/31
  Time: 16:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <h3>表单提交</h3>
    <form action="test/add" method="post">
        <p>图书名称:<input type="text" name="bookName"/></p>
        <p>图书作者:<input type="text" name="bookAuthor"/></p>
        <p>图书价格:<input type="text" name="bookPrice"/></p>
        <p>出版时间:<input type="text" name="publishTime"/></p>
        <p><input type="submit" value="提交"/></p>
    </form>

    <h3>超链接提交</h3>
    <a href="book/add?bookName=Java">URL提交</a>

    <h3>AJAX提交</h3>
    <input type="button" value="ajax提交" id="btn1"/>
    <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript">
        $("#btn1").click(function(){
            var obj = {};
            obj.bookName = "Python";
            obj.bookAuthor="杰哥";
            obj.bookPrice = 2.22;

            var s = JSON.stringify(obj);

            $.ajax({
                url:"book/update",
                type:"post",
                contentType:"application/json",
                data:s,
                success:function(res){
                    console.log(res);
                }
            });
        });
    </script>
</body>
</html>
