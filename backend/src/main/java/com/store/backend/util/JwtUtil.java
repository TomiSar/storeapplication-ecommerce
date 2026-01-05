package com.store.backend.util;

import com.store.backend.entity.Customer;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private static final long JWT_EXPIRATION_TIME_MS = 1000L * 60L * 60L; // 1 hour

    @Value("${JWT_SECRET}")
    private String jwtSecret;

    public String generateJwtToken(Authentication authentication) {
        Customer fetchedCustomer = (Customer) authentication.getPrincipal();

        // Secret key
        SecretKey secretKey = new SecretKeySpec(jwtSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

        //// Authorities -> ["ADMIN", "USER"]
        // List<String> authorities = fetchedCustomer.getAuthorities().stream()
        // .map(GrantedAuthority::getAuthority)
        // .toList();
        //// Admin flag
        // boolean isAdmin = authorities.contains("ADMIN") ||
        //// authorities.contains("ROLE_ADMIN");

        return Jwts.builder()
                .issuer("Store Application")
                .subject("JWT Token")
                .claim("username", fetchedCustomer.getName())
                .claim("email", fetchedCustomer.getEmail())
                .claim("mobileNumber", fetchedCustomer.getMobileNumber())
                // .claim("authorities", authorities)
                // .claim("admin", isAdmin)
                .issuedAt(new Date())
                .expiration(new Date((System.currentTimeMillis()) + JWT_EXPIRATION_TIME_MS))
                .signWith(secretKey).compact();
    }
}
