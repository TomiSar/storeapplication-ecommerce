package com.store.backend.service;

import com.store.backend.dto.OrderRequestDto;

public interface OrderService {

    void createOrder(OrderRequestDto orderRequest);
}
