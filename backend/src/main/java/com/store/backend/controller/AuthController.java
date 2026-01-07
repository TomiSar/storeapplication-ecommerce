package com.store.backend.controller;

import com.store.backend.dto.LoginRequestDto;
import com.store.backend.dto.LoginResponseDto;
import com.store.backend.dto.RegisterRequestDto;
import com.store.backend.dto.UserDto;
import com.store.backend.entity.Customer;
import com.store.backend.entity.Role;
import com.store.backend.repository.CustomerRepository;
import com.store.backend.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.authentication.password.CompromisedPasswordDecision;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;
    private final JwtUtil jwtUtil;
    private final CompromisedPasswordChecker compromisedPasswordChecker;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> apiLogin(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.username(), loginRequestDto.password()));
            var userDto = new UserDto();
            var loggedInUser = (Customer) authentication.getPrincipal();
            BeanUtils.copyProperties(loggedInUser, userDto);
            userDto.setRoles(authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")));

            // Generate JWT token after successful authentication
            String jwtToken = jwtUtil.generateJwtToken(authentication);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new LoginResponseDto(HttpStatus.OK.getReasonPhrase(), userDto, jwtToken));
        } catch (BadCredentialsException exception) {
            return buildErrorResponse(HttpStatus.UNAUTHORIZED,
                    "Invalid username or password");
        } catch (AuthenticationException exception) {
            return buildErrorResponse(HttpStatus.UNAUTHORIZED,
                    "Authentication failed");
        } catch (Exception exception) {
            return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An unexpected error occurred");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDto registerRequestDto) {
        // Check is the password is weak or compromised
        CompromisedPasswordDecision decision = compromisedPasswordChecker.check(registerRequestDto.getPassword());
        if (decision.isCompromised()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("password", "The provided password is too weak. Please choose a stronger password."));
        }

        // Check if user with the same email or mobile number already exists
        Optional<Customer> existingCustomer = customerRepository.findByEmailOrMobileNumberOrName(
                registerRequestDto.getEmail(), registerRequestDto.getMobileNumber(), registerRequestDto.getName());

        if (existingCustomer.isPresent()) {
            Map<String, String> registerErrors = getRegisterErrorMessage(registerRequestDto, existingCustomer.get());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registerErrors);
        }

        Customer customer = new Customer();
        BeanUtils.copyProperties(registerRequestDto, customer);
        // Encode the password before saving
        customer.setPasswordHash(passwordEncoder.encode(registerRequestDto.getPassword()));
        Role role = new Role();
        role.setName("ROLE_USER");
        customer.setRoles(Set.of(role));
        customerRepository.save(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
    }

    private static Map<String, String> getRegisterErrorMessage(
            RegisterRequestDto registerRequestDto, Customer existingCustomer) {
        Map<String, String> registerErrors = new HashMap<>();
        if (existingCustomer.getName().equals(registerRequestDto.getName())) {
            registerErrors.put("name", "This name is already in use. Please enter a different name.");
        }
        if (existingCustomer.getEmail().equalsIgnoreCase(registerRequestDto.getEmail())) {
            registerErrors.put("email", "This email is already in use. Please enter a different email address.");
        }
        if (existingCustomer.getMobileNumber().equals(registerRequestDto.getMobileNumber())) {
            registerErrors.put("mobileNumber",
                    "This mobile number is already in use. Please enter a different number.");
        }
        return registerErrors;
    }

    private ResponseEntity<LoginResponseDto> buildErrorResponse(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(new LoginResponseDto(message, null, null));
    }
}
