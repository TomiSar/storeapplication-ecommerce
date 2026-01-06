package com.store.backend.config;

import com.store.backend.entity.Customer;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Component("auditorAwareImpl")
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return Optional.of("Anonymous user");
        }
        Object principal = authentication.getPrincipal();
        String username;

        if (principal instanceof Customer customer) {
            username = customer.getEmail();
        } else {
            // Fallback to principal's toString() if it's not a Customer instance
            username = principal.toString();
        }

        return Optional.of(username);
    }
}