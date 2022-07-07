package com.qfedu.ioc.servlets;

import com.qfedu.ioc.service.ProductService;
import com.qfedu.ioc.service.impl.ProductServiceImpl;

public class TestServlet {

    private ProductService productService;

    public void setProductService(ProductService productService) {
        this.productService = productService;
    }

    public void doGet(){
        doPost();
    }

    public void doPost(){
        productService.listProducts();
    }


}
