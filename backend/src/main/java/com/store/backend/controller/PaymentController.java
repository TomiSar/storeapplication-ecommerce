package com.store.backend.controller;

import com.store.backend.dto.PaymentIntentRequestDto;
import com.store.backend.dto.PaymentIntentResponseDto;
import com.store.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<PaymentIntentResponseDto> createPaymentIntent(@RequestBody PaymentIntentRequestDto paymentRequest) {
        PaymentIntentResponseDto response = paymentService.createPaymentIntent(paymentRequest);
        return ResponseEntity.ok(response);
    }
}
