package com.store.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.backend.dto.ContactResponseDto;
import com.store.backend.dto.OrderResponseDto;
import com.store.backend.dto.ResponseDto;
import com.store.backend.entity.Order;
import com.store.backend.service.ContactService;
import com.store.backend.service.OrderService;
import com.store.backend.util.ApplicationConstants;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class AdminController {

    private final OrderService orderService;
    private final ContactService contactService;

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDto>> getAllPendingOrders() {
        return ResponseEntity.ok().body(orderService.getAllPendingOrders());
    }

    @PatchMapping("/orders/{orderId}/confirm")
    public ResponseEntity<ResponseDto> confirmOrder(@PathVariable Long orderId) {
//    Order confirmedOrder = orderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CONFIRMED);
//    return ResponseEntity
//        .ok(new ResponseDto("200", "Order " + confirmedOrder.getOrderId() + " has been confirmed."));

        // Custom Query version
        orderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CONFIRMED);
        return ResponseEntity
                .ok(new ResponseDto("200", "Order " + orderId + " has been confirmed."));
    }

    @PatchMapping("/orders/{orderId}/cancel")
    public ResponseEntity<ResponseDto> cancelOrder(@PathVariable Long orderId) {
//    Order canceledOrder = orderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CANCELLED);
//    return ResponseEntity
//        .ok(new ResponseDto("200", "Order " + canceledOrder.getOrderId() + " has been canceled."));

        // Custom Query version
        orderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CANCELLED);
        return ResponseEntity
                .ok(new ResponseDto("200", "Order " + orderId + " has been canceled."));
    }

    @PatchMapping("/message/{contactId}/close")
    public ResponseEntity<ResponseDto> closeMessage(@PathVariable Long contactId) {
        contactService.updateMessageStatus(contactId, ApplicationConstants.CLOSED_MESSAGE);
        return ResponseEntity
                .ok(new ResponseDto("200", "Contact message " + contactId + " has been closed."));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ContactResponseDto>> getAllOpenMessages() {
        return ResponseEntity.ok(contactService.getAllOpenMessages());
    }
}
