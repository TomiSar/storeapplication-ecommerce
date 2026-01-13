package com.store.backend.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.store.backend.entity.Customer;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;

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
                .claim("roles", authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")))
                .issuedAt(new Date())
                .expiration(new Date((System.currentTimeMillis()) + jwtProperties.getExpirationTimeMs()))
                .signWith(secretKey).compact();
    }

    public SecretKey getSecretKey() {
        return new SecretKeySpec(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }
}
