package com.store.backend.service;

import java.util.List;

import com.store.backend.dto.OrderRequestDto;
import com.store.backend.dto.OrderResponseDto;
import com.store.backend.entity.Order;

public interface OrderService {

    void createOrder(OrderRequestDto orderRequest);

    List<OrderResponseDto> getCustomerOrders();

    List<OrderResponseDto> getAllPendingOrders();

//    Order updateOrderStatus(Long orderId, String orderStatus);

    // Custom Query version
    void updateOrderStatus(Long orderId, String orderStatus);
}
