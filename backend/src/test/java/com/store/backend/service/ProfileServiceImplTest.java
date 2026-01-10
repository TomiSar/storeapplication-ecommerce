package com.store.backend.service;

import com.store.backend.dto.ProfileRequestDto;
import com.store.backend.dto.ProfileResponseDto;
import com.store.backend.entity.Address;
import com.store.backend.entity.Customer;
import com.store.backend.repository.CustomerRepository;
import com.store.backend.service.impl.ProfileServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProfileServiceImplTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private ProfileServiceImpl profileService;

    private Customer testCustomer;
    private Address testAddress;

    @BeforeEach
    void setUp() {
        testCustomer = new Customer();
        testCustomer.setName("Test User");
        testCustomer.setEmail("test@example.com");
        testCustomer.setMobileNumber("1234567890");

        testAddress = new Address();
        testAddress.setStreet("Test Street");
        testAddress.setCity("Test City");
        testAddress.setState("Test State");
        testAddress.setPostalCode("12345");
        testAddress.setCountry("Test Country");
        testCustomer.setAddress(testAddress);

        // Mock SecurityContext
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("test@example.com");
        SecurityContextHolder.setContext(new SecurityContextImpl(authentication));
    }

    @Test
    void testGetProfile_shouldReturnProfileResponseDto() {
        // Arrange
        when(customerRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testCustomer));

        // Act
        ProfileResponseDto result = profileService.getProfile();

        // Assert
        assertNotNull(result);
        assertEquals("Test User", result.getName());
        assertEquals("test@example.com", result.getEmail());
        assertEquals("1234567890", result.getMobileNumber());
        assertNotNull(result.getAddress());
        assertEquals("Test Street", result.getAddress().getStreet());
        assertEquals("Test City", result.getAddress().getCity());
        assertEquals("Test State", result.getAddress().getState());
        assertEquals("12345", result.getAddress().getPostalCode());
        assertEquals("Test Country", result.getAddress().getCountry());

        verify(customerRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testUpdateProfile_shouldUpdateCustomerAndReturnProfileResponseDto() {
        // Arrange
        when(customerRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testCustomer));
        when(customerRepository.save(any(Customer.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ProfileRequestDto updateDto = new ProfileRequestDto();
        updateDto.setName("Updated Name");
        updateDto.setEmail("updated@example.com");
        updateDto.setMobileNumber("9876543210");
        updateDto.setStreet("New Street");
        updateDto.setCity("New City");
        updateDto.setState("New State");
        updateDto.setPostalCode("54321");
        updateDto.setCountry("New Country");

        // Act
        ProfileResponseDto result = profileService.updateProfile(updateDto);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Name", result.getName());
        assertEquals("updated@example.com", result.getEmail());
        assertEquals("9876543210", result.getMobileNumber());
        assertNotNull(result.getAddress());
        assertEquals("New Street", result.getAddress().getStreet());
        assertEquals("New City", result.getAddress().getCity());
        assertEquals("New State", result.getAddress().getState());
        assertEquals("54321", result.getAddress().getPostalCode());
        assertEquals("New Country", result.getAddress().getCountry());
        assertTrue(result.isEmailUpdated());
        verify(customerRepository, times(1)).findByEmail("test@example.com");
        verify(customerRepository, times(1)).save(any(Customer.class));
    }
}
