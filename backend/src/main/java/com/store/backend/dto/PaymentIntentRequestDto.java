package com.store.backend.dto;

public record PaymentIntentRequestDto(Long amount, String currency) {
}
