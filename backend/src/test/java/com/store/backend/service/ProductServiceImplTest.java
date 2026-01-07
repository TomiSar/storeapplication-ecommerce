package com.store.backend.service;

import com.store.backend.dto.ProductDto;
import com.store.backend.entity.Product;
import com.store.backend.repository.ProductRepository;
import com.store.backend.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private ProductDto testProductDto;
    private Product testProductUno;
    private Product testProductDos;

    @BeforeEach
    void setUp() {
        testProductDto = new ProductDto();
        testProductDto.setName("Laptop");
        testProductDto.setDescription("MacBook Pro");
        testProductDto.setPrice(BigDecimal.valueOf(1500.00));
        testProductDto.setPopularity(100);
        testProductDto.setImageUrl("http://example.com/laptop.jpg");

        testProductUno = new Product();
        testProductUno.setName("Smartphone");
        testProductUno.setDescription("Nokia 2110");
        testProductUno.setPrice(BigDecimal.valueOf(10.00));
        testProductUno.setImageUrl("http://example.com/nokia2110.jpg");

        testProductDos = new Product();
        testProductDos.setName("Car");
        testProductDos.setDescription("Lamborghini Countach");
        testProductDos.setPrice(BigDecimal.valueOf(1000000.00));
        testProductDos.setImageUrl("http://example.com/lamborghini.jpg");
    }

    @Test
    void testGetProducts_shouldReturnListOfProductDtos() {
        // Arr
        List<Product> testProducts = Arrays.asList(testProductUno, testProductDos);
        when(productRepository.findAll()).thenReturn(testProducts);

        // Act
        List<ProductDto> result = productService.getProducts();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());

        assertEquals("Smartphone", result.get(0).getName());
        assertEquals("Nokia 2110", result.get(0).getDescription());
        assertEquals(BigDecimal.valueOf(10.00), result.get(0).getPrice());
        assertEquals("http://example.com/nokia2110.jpg", result.get(0).getImageUrl());

        assertEquals("Car", result.get(1).getName());
        assertEquals("Lamborghini Countach", result.get(1).getDescription());
        assertEquals(BigDecimal.valueOf(1000000.00), result.get(1).getPrice());
        assertEquals("http://example.com/lamborghini.jpg", result.get(1).getImageUrl());

        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testGetProducts_ShouldReturnEmptyList_WhenNoProducts() {
        // Arr
        when(productRepository.findAll()).thenReturn(Arrays.asList());

        // Act
        List<ProductDto> result = productService.getProducts();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(productRepository, times(1)).findAll();
    }


}
