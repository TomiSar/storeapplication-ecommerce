package com.store.backend.service;

import com.store.backend.dto.ProductDto;

import java.util.List;

public interface ProductService {

    List<ProductDto> getProducts();
}
