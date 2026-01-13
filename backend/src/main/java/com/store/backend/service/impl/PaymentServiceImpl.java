package com.store.backend.service.impl;

import org.springframework.stereotype.Service;

import com.store.backend.dto.PaymentIntentRequestDto;
import com.store.backend.dto.PaymentIntentResponseDto;
import com.store.backend.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Override
    public PaymentIntentResponseDto createPaymentIntent(PaymentIntentRequestDto requestDto) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(requestDto.amount())
                    .setCurrency(requestDto.currency())
                    .addPaymentMethodType("card").build();

            // Here you would call Stripe's API to create the payment intent
            PaymentIntent paymentIntent = PaymentIntent.create(params);
            return new PaymentIntentResponseDto(paymentIntent.getClientSecret());
        } catch (StripeException exception) {
            throw new RuntimeException("Failed to create payment intent", exception);
        }

    }
}
