package com.store.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.backend.dto.ProductDto;
import com.store.backend.service.ProductService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ProductController {

    private final ProductService productService;

    // Get all products
    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts() {
        List<ProductDto> productList = productService.getProducts();
        log.info("Found {} products. Products: {} ", productList.size(), productList);
        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }
}
