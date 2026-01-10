package com.store.backend.service;

import com.store.backend.dto.PaymentIntentRequestDto;
import com.store.backend.dto.PaymentIntentResponseDto;

public interface PaymentService {

    PaymentIntentResponseDto createPaymentIntent(PaymentIntentRequestDto requestDto);
}
