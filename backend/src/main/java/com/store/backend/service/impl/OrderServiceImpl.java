package com.store.backend.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.stereotype.Service;

import com.store.backend.dto.OrderItemResponseDto;
import com.store.backend.dto.OrderRequestDto;
import com.store.backend.dto.OrderResponseDto;
import com.store.backend.entity.Customer;
import com.store.backend.entity.Order;
import com.store.backend.entity.OrderItem;
import com.store.backend.entity.Product;
import com.store.backend.exception.ResourceNotFoundException;
import com.store.backend.repository.OrderRepository;
import com.store.backend.repository.ProductRepository;
import com.store.backend.service.OrderService;
import com.store.backend.util.ApplicationConstants;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProfileServiceImpl profileService;

    @Override
    public void createOrder(OrderRequestDto orderRequest) {
        Customer customer = profileService.getAuthenticatedCustomer();

        // Create Order
        Order order = new Order();
        order.setCustomer(customer);
        BeanUtils.copyProperties(orderRequest, order);
        order.setOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);

        // Map OrderItems
        List<OrderItem> orderItems = orderRequest.items().stream().map(item -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            Product product = productRepository.findById(item.productId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "ProductID",
                            item.productId().toString()));
            orderItem.setProduct(product);
            orderItem.setQuantity(item.quantity());
            orderItem.setPrice(item.price());
            return orderItem;
        }).toList();
        order.setOrderItems(orderItems);
        orderRepository.save(order);
    }

    @Override
    public List<OrderResponseDto> getCustomerOrders() {
        Customer customer = profileService.getAuthenticatedCustomer();
//        List<Order> orders = orderRepository.findByCustomerOrderByCreatedAtDesc(customer);
//        List<Order> orders = orderRepository.findOrdersByCustomer(customer);
        List<Order> orders = orderRepository.findOrdersByCustomerNativeQuery(customer.getCustomerId());
        return orders.stream().map(this::mapToOrderResponseDTO).toList();
    }

    @Override
    public List<OrderResponseDto> getAllPendingOrders() {
//        List<Order> orders = orderRepository
//                .findByOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);
//        List<Order> orders = orderRepository
//                .findOrdersByStatus(ApplicationConstants.ORDER_STATUS_CREATED);
        List<Order> orders = orderRepository
                .findOrdersByStatusNativeQuery(ApplicationConstants.ORDER_STATUS_CREATED);
        return orders.stream().map(this::mapToOrderResponseDTO).toList();
    }

    // Query to update order status
//    @Override
//    public Order updateOrderStatus(Long orderId, String orderStatus) {
//        Order order = orderRepository.findById(orderId).orElseThrow(
//                () -> new ResourceNotFoundException("Order", "OrderID", orderId.toString()));
//        order.setOrderStatus(orderStatus);
//        return orderRepository.save(order);
//    }

    // Custom Query version
    @Override
    public void updateOrderStatus(Long orderId, String orderStatus) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        orderRepository.updateOrderStatus(orderId, orderStatus, email);
    }

    /** Map Order entity to OrderResponseDto **/
    private OrderResponseDto mapToOrderResponseDTO(Order order) {
        return new OrderResponseDto(
                order.getOrderId(),
                order.getOrderStatus(),
                order.getTotalPrice(),
                order.getCreatedAt().toString(),
                order.getOrderItems().stream().map(this::mapToOrderItemResponseDTO).toList());
    }

    /** Map OrderItem entity to OrderItemResponseDto **/
    private OrderItemResponseDto mapToOrderItemResponseDTO(OrderItem orderItem) {
        return new OrderItemResponseDto(
                orderItem.getProduct().getName(),
                orderItem.getQuantity(),
                orderItem.getPrice(),
                orderItem.getProduct().getImageUrl());
    }

}
