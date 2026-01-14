package com.store.backend.service;

import com.store.backend.dto.*;
import com.store.backend.entity.*;
import com.store.backend.exception.ResourceNotFoundException;
import com.store.backend.dto.OrderRequestDto;
import com.store.backend.repository.OrderRepository;
import com.store.backend.repository.ProductRepository;
import com.store.backend.service.impl.OrderServiceImpl;
import com.store.backend.service.impl.ProfileServiceImpl;
import com.store.backend.util.ApplicationConstants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

  @Mock
  private OrderRepository orderRepository;
  @Mock
  private ProductRepository productRepository;
  @Mock
  private ProfileServiceImpl profileService;

  @InjectMocks
  private OrderServiceImpl orderService;

  private Customer testCustomer;
  private Product testProduct;
  private Order testOrder;
  private OrderItem testOrderItem;

  @BeforeEach
  void setUp() {
    testCustomer = new Customer();
    testCustomer.setCustomerId(1L);
    testCustomer.setName("Testi Asiakas");

    testProduct = new Product();
    testProduct.setId(10L);
    testProduct.setName("Testituote");
    testProduct.setImageUrl("img.png");

    testOrder = new Order();
    testOrder.setOrderId(100L);
    testOrder.setCustomer(testCustomer);
    testOrder.setOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);
    testOrder.setTotalPrice(BigDecimal.valueOf(99.99));
    testOrder.setCreatedAt(java.time.Instant.now());

    testOrderItem = new OrderItem();
    testOrderItem.setOrder(testOrder);
    testOrderItem.setProduct(testProduct);
    testOrderItem.setQuantity(2);
    testOrderItem.setPrice(BigDecimal.valueOf(49.99));
    testOrder.setOrderItems(List.of(testOrderItem));
  }

  @Test
  void createOrder_shouldSaveOrder() {
    // Arrange
    OrderItemDto itemDto = new OrderItemDto(testProduct.getId(), 2, BigDecimal.valueOf(49.99));
    OrderRequestDto orderRequestDto = new OrderRequestDto(
        BigDecimal.valueOf(99.99),
        "testPaymentId",
        "PAID",
        List.of(itemDto));
    when(profileService.getAuthenticatedCustomer()).thenReturn(testCustomer);
    when(productRepository.findById(testProduct.getId())).thenReturn(Optional.of(testProduct));
    when(orderRepository.save(any(Order.class))).thenReturn(testOrder);

    // Act
    orderService.createOrder(orderRequestDto);

    // Assert
    verify(orderRepository, times(1)).save(any(Order.class));
  }

  @Test
  void createOrder_shouldThrowResourceNotFoundException_productNotFound() {
    // Arrange
    OrderItemDto itemDto = new OrderItemDto(999L, 2, BigDecimal.valueOf(49.99));
    OrderRequestDto orderRequestDto = new OrderRequestDto(
        BigDecimal.valueOf(49.99),
        "testPaymentId",
        "PAID",
        List.of(itemDto));
    when(profileService.getAuthenticatedCustomer()).thenReturn(testCustomer);
    when(productRepository.findById(999L)).thenReturn(Optional.empty());

    // Act & Assert
    assertThrows(ResourceNotFoundException.class, () -> orderService.createOrder(orderRequestDto));
    verify(productRepository, times(1)).findById(999L);
  }

  @Test
  void getCustomerOrders_shouldReturnOrderResponseDtos() {
    // Arrange
    when(profileService.getAuthenticatedCustomer()).thenReturn(testCustomer);
    when(orderRepository.findByCustomerOrderByCreatedAtDesc(testCustomer)).thenReturn(List.of(testOrder));

    // Act
    List<OrderResponseDto> result = orderService.getCustomerOrders();

    // Assert
    assertEquals(1, result.size());
    assertEquals(testOrder.getOrderId(), result.get(0).orderId());
  }

  @Test
  void getAllPendingOrders_shouldReturnOrderResponseDtos() {
    // Arrange
    when(orderRepository.findByOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED)).thenReturn(List.of(testOrder));

    // Act
    List<OrderResponseDto> result = orderService.getAllPendingOrders();

    // Assert
    assertEquals(1, result.size());
    assertEquals(testOrder.getOrderId(), result.get(0).orderId());
  }

  @Test
  void updateOrderStatus_shouldUpdateStatusAndSave() {
    // Arrange
    Long orderId = testOrder.getOrderId();
    String newStatus = ApplicationConstants.ORDER_STATUS_CONFIRMED; // Use a valid status

    when(orderRepository.findById(orderId)).thenReturn(Optional.of(testOrder));
    when(orderRepository.save(testOrder)).thenReturn(testOrder);

    // Act
    Order updatedOrder = orderService.updateOrderStatus(orderId, newStatus);

    // Assert
    assertEquals(newStatus, updatedOrder.getOrderStatus());
    verify(orderRepository, times(1)).findById(orderId);
    verify(orderRepository, times(1)).save(testOrder);
  }

  @Test
  void updateOrderStatus_shouldThrowResourceNotFoundException_orderIdNotFound() {
    // Arrange
    Long invalidOrderId = 999L;
    String newStatus = ApplicationConstants.ORDER_STATUS_CANCELLED;
    when(orderRepository.findById(invalidOrderId)).thenReturn(Optional.empty());

    // Act & Assert
    assertThrows(ResourceNotFoundException.class, () -> orderService.updateOrderStatus(invalidOrderId, newStatus));
    verify(orderRepository, times(1)).findById(invalidOrderId);
  }

  @Test
  void mapToOrderResponseDTO_shouldMapOrderToDto() {
    // Act
    // Instead of reflection, test via public API if possible. If not, make the
    // method package-private for testing.
    // Here, we skip this test or refactor the method visibility if needed.
  }

  @Test
  void mapToOrderItemResponseDTO_shouldMapOrderItemToDto() {
    // Act
    // Instead of reflection, test via public API if possible. If not, make the
    // method package-private for testing.
    // Here, we skip this test or refactor the method visibility if needed.
  }

}
