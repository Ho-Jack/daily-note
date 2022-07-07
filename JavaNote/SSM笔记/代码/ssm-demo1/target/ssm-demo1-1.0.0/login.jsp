<%--
  Created by IntelliJ IDEA.
  User: THEO
  Date: 2021/4/2
  Time: 15:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <base href="${pageContext.request.contextPath}/">
    <title>Title</title>
</head>
<body>
${pageContext.request.contextPath}

<h3>登录页面</h3>
${tips}
<form action="user/login" method="post">
    <p>帐号：<input type="text" name="userName"/></p>
    <p>密码：<input type="password" name="userPwd"/></p>
    <p><input type="submit" value="登录"/></p>
</form>
</body>
</html>
