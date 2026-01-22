package com.store.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;

import com.store.backend.entity.Customer;
import com.store.backend.entity.Order;
import org.springframework.data.repository.query.*;
import org.springframework.transaction.annotation.*;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Fetch orders for a customer, sorted by creation date in descending order.
    List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer);

    List<Order> findByOrderStatus(String orderStatus);

    @Query("SELECT o FROM Order o WHERE o.customer = :customer ORDER BY o.createdAt DESC")
    List<Order> findOrdersByCustomer(@Param("customer") Customer customer);

    @Query("SELECT o FROM Order o WHERE o.orderStatus = ?1")
    List<Order> findOrdersByStatus(String orderStatus);

    @Query(value = "SELECT * FROM orders o WHERE o.customer_id = :customerId ORDER BY o.created_at DESC", nativeQuery = true)
    List<Order> findOrdersByCustomerNativeQuery(@Param("customerId") Long customerId);

    @Query(value = "SELECT * FROM orders o WHERE o.order_status = ?1", nativeQuery = true)
    List<Order> findOrdersByStatusNativeQuery(String orderStatus);

    // Custom Query to update order status
    @Transactional
    @Modifying
    @Query("UPDATE Order o SET o.orderStatus=:orderStatus,o.updatedAt=CURRENT_TIMESTAMP,o.updatedBy=:updatedBy WHERE o.orderId=:orderId")
    int updateOrderStatus(@Param("orderId") Long orderId, @Param("orderStatus") String orderStatus,
                          @Param("updatedBy") String updatedBy);
}
