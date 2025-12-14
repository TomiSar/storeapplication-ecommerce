package com.store.backend.controller;

import com.store.backend.dto.ProductDto;
import com.store.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ProductController {

    private final ProductService productService;

    // Get all products
    @GetMapping
    public List<ProductDto> getProducts() {
        List<ProductDto> productList = productService.getProducts();
        log.info("Found {} products. Products: {} ", productList.size(), productList);
        return productService.getProducts();
    }
}
