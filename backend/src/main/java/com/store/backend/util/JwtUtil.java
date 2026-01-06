package com.store.backend.util;

import com.store.backend.entity.Customer;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperties jwtProperties;

    public String generateJwtToken(Authentication authentication) {
        Customer activeCustomer = (Customer) authentication.getPrincipal();
        SecretKey secretKey = getSecretKey();
        return Jwts.builder().issuer("Store Application").subject("JWT Token")
                .claim("username", activeCustomer.getName())
                .claim("email", activeCustomer.getEmail())
                .claim("mobileNumber", activeCustomer.getMobileNumber())
                .issuedAt(new Date())
                .expiration(new Date((System.currentTimeMillis()) + jwtProperties.getExpirationTimeMs()))
                .signWith(secretKey).compact();
    }

    public SecretKey getSecretKey() {
        return new SecretKeySpec(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }
}
