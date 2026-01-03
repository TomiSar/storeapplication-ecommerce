package com.store.backend.util;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private static final long JWT_EXPIRATION_TIME_MS = 1000L * 60L * 60L; // 1 hour
    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${JWT_SECRET}")
    private String jwtSecret;

    public String generateJwtToken(Authentication authentication) {
        User fetchedUser = (User) authentication.getPrincipal();

        // Secret key
        SecretKey secretKey = new SecretKeySpec(jwtSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

        // Authorities -> ["ADMIN", "USER"]
        List<String> authorities = fetchedUser.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        // Admin flag
        boolean isAdmin = authorities.contains("ADMIN") || authorities.contains("ROLE_ADMIN");

        return Jwts.builder()
                .issuer("Store Application")
                .subject("JWT Token")
                .claim("username", fetchedUser.getUsername())
                .claim("authorities", authorities)
                .claim("admin", isAdmin)
                .issuedAt(new Date())
                .expiration(new Date((System.currentTimeMillis()) + JWT_EXPIRATION_TIME_MS))
                .signWith(secretKey).compact();
    }
}
