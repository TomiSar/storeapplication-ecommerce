package com.store.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.backend.entity.Customer;
import com.store.backend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Fetch orders for a customer, sorted by creation date in descending order.
    List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer);

    List<Order> findByOrderStatus(String orderStatus);
}
