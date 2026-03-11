package com.store.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.store.backend.dto.ContactResponseDto;
import com.store.backend.dto.OrderResponseDto;
import com.store.backend.dto.ResponseDto;
import com.store.backend.dto.UserDto;
import com.store.backend.entity.Order;
import com.store.backend.entity.Customer;
import com.store.backend.entity.Role;
import com.store.backend.repository.CustomerRepository;
import com.store.backend.repository.RoleRepository;
import com.store.backend.service.ContactService;
import com.store.backend.service.OrderService;
import com.store.backend.util.ApplicationConstants;
import org.springframework.beans.BeanUtils;

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
    private final CustomerRepository customerRepository;
    private final RoleRepository roleRepository;

    /**
     * Grant ROLE_ADMIN to a user by email. Only admin can call this endpoint.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/grant-admin")
    public ResponseEntity<?> grantAdminRole(@RequestBody java.util.Map<String, String> request) {
        String email = request.get("email");
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }
        Customer customer = customerOpt.get();
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("ROLE_ADMIN not found"));
        Set<Role> roles = customer.getRoles();
        if (!roles.contains(adminRole)) {
            roles.add(adminRole);
            customer.setRoles(roles);
            customerRepository.save(customer);
        }
        return ResponseEntity.ok("Admin role granted");
    }

    /**
     * List all users for admin management page. Only admin can call this endpoint.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = customerRepository.findAll().stream()
                .map(customer -> {
                    UserDto dto = new UserDto();
                    BeanUtils.copyProperties(customer, dto);
                    dto.setUserId(customer.getCustomerId());
                    dto.setRoles(customer.getRoles().stream()
                            .map(Role::getName).collect(Collectors.joining(",")));
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDto>> getAllPendingOrders() {
        return ResponseEntity.ok().body(orderService.getAllPendingOrders());
    }

    @PatchMapping("/orders/{orderId}/confirm")
    public ResponseEntity<ResponseDto> confirmOrder(@PathVariable Long orderId) {
        // Order confirmedOrder = orderService.updateOrderStatus(orderId,
        // ApplicationConstants.ORDER_STATUS_CONFIRMED);
        // return ResponseEntity
        // .ok(new ResponseDto("200", "Order " + confirmedOrder.getOrderId() + " has
        // been confirmed."));

        // Custom Query version
        orderService.updateOrderStatus(orderId, ApplicationConstants.ORDER_STATUS_CONFIRMED);
        return ResponseEntity
                .ok(new ResponseDto("200", "Order " + orderId + " has been confirmed."));
    }

    @PatchMapping("/orders/{orderId}/cancel")
    public ResponseEntity<ResponseDto> cancelOrder(@PathVariable Long orderId) {
        // Order canceledOrder = orderService.updateOrderStatus(orderId,
        // ApplicationConstants.ORDER_STATUS_CANCELLED);
        // return ResponseEntity
        // .ok(new ResponseDto("200", "Order " + canceledOrder.getOrderId() + " has been
        // canceled."));

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
