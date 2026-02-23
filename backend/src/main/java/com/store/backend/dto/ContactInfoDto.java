package com.store.backend.dto;

import org.springframework.boot.context.properties.*;

@ConfigurationProperties("contact")
public record ContactInfoDto(String phone, String email, String address) {
}
