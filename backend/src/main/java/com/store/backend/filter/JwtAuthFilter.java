package com.store.backend.filter;

import com.store.backend.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final AntPathMatcher pathMatcher = new AntPathMatcher();
    private final JwtUtil jwtUtil;
    private final List<String> publicPaths;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (null != authHeader && authHeader.startsWith("Bearer ")) {
            try {
                // Extract JWT token from header
                String jwtToken = authHeader.replace("Bearer ", ""); // Remove "Bearer " prefix
                SecretKey secretKey = jwtUtil.getSecretKey();
                Claims claims = Jwts.parser().verifyWith(secretKey)
                        .build().parseSignedClaims(jwtToken).getPayload();
                String username = String.valueOf(claims.get("email"));
                String roles = String.valueOf(claims.get("roles"));
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(roles));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (ExpiredJwtException expiredJwtException) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("JWT token has expired");
                return;
            } catch (Exception exception) {
                throw new BadCredentialsException("Invalid JWT token: ", exception);
            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return publicPaths.stream()
                .anyMatch(publicPath -> pathMatcher.match(publicPath, request.getRequestURI()));
    }
}
