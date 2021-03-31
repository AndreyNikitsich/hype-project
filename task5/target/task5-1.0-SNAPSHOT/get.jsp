<%@ page import="java.io.PrintWriter" %><%--
  Created by IntelliJ IDEA.
  User: N
  Date: 31.03.2021
  Time: 20:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Get</title>
</head>
<body>
<%
    String param = request.getParameter("name");
    String resp;
    if(param!=null&&param.length()<=100){
        resp = "Name is " + param;
    }else if(param==null){
        resp = "You must include parameter if you want to get pretty response...";
    }else{
        resp = "Sorry, your name is too long...";
    }
%>
<h1><%=resp%></h1>
</body>
</html>
